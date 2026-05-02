import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import { RedisService } from '@/redis';

/**
 * Service xử lý logic OTP (Sinh mã, Kiểm tra giới hạn, Xác thực)
 * (EN: OTP logic service - Generation, Rate limiting, Verification)
 */
@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  // Cấu hình các hằng số (EN: Constants configuration)
  private readonly OTP_TTL = 300; // 5 phút (EN: 5 minutes)
  private readonly RETRY_LIMIT = 3; // Tối đa 3 lần gửi/phút (EN: Max 3 sends/minute)
  private readonly RETRY_TTL = 60; // 1 phút chặn spam (EN: 1 minute spam block)
  private readonly FAIL_LIMIT = 5; // Tối đa 5 lần nhập sai (EN: Max 5 failed attempts)
  private readonly FAIL_TTL = 900; // 15 phút khóa nếu sai quá nhiều (EN: 15 minutes block)

  constructor(private redisService: RedisService) {}

  /**
   * Gửi mã OTP cho người dùng
   * (EN: Send OTP to user)
   *
   * @param phone - Số điện thoại nhận mã (EN: Receiver phone number)
   * @returns Object chứa thông báo thành công (EN: Success message object)
   */
  async sendOtp(phone: string) {
    const retryKey = `retry:${phone}`;

    // 1. Kiểm tra giới hạn gửi mã (EN: Check rate limit for sending)
    const retryCount = await this.redisService.get(retryKey);
    if (retryCount && parseInt(retryCount) >= this.RETRY_LIMIT) {
      // Ném lỗi 429 nếu spam (EN: Throw 429 if spamming)
      throw new HttpException(
        'Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau 1 phút.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // 2. Sinh mã OTP 6 số an toàn (EN: Generate secure 6-digit OTP)
    const otp = randomInt(100000, 999999).toString();

    // 3. Lưu OTP vào Redis với TTL (EN: Save OTP to Redis with TTL)
    const otpKey = `otp:${phone}`;
    await this.redisService.set(otpKey, otp, this.OTP_TTL);

    // 4. Cập nhật bộ đếm gửi mã (EN: Update send retry counter)
    const currentRetry = await this.redisService.incr(retryKey);
    if (currentRetry === 1) {
      // Set TTL 1 phút cho lần đầu (EN: Set 1 min TTL for first retry)
      await this.redisService.expire(retryKey, this.RETRY_TTL);
    }

    // 5. Log mã OTP ra terminal để debug (EN: Log OTP for debugging)
    this.logger.log(`[DEBUG] OTP for ${phone}: ${otp}`);

    return {
      message: 'OTP sent successfully',
      expiresIn: '5m',
    };
  }

  /**
   * Xác thực mã OTP người dùng nhập
   * (EN: Verify user-provided OTP)
   *
   * @param phone - Số điện thoại (EN: Phone number)
   * @param code - Mã OTP người dùng nhập (EN: User-entered code)
   */
  async verifyOtp(phone: string, code: string) {
    const failKey = `fails:${phone}`;

    // 1. Kiểm tra xem có bị khóa do nhập sai quá nhiều không (EN: Check if blocked due to brute-force)
    const failCount = await this.redisService.get(failKey);
    if (failCount && parseInt(failCount) >= this.FAIL_LIMIT) {
      throw new ForbiddenException(
        'Bạn đã nhập sai quá 5 lần. Tính năng xác thực bị khóa trong 15 phút.',
      );
    }

    // 2. Lấy mã OTP thực tế từ Redis (EN: Get actual OTP from Redis)
    const otpKey = `otp:${phone}`;
    const storedOtp = await this.redisService.get(otpKey);

    // 3. So sánh mã (EN: Compare codes)
    if (!storedOtp || storedOtp !== code) {
      // Tăng biến đếm sai (EN: Increment fail counter)
      const currentFails = await this.redisService.incr(failKey);
      if (currentFails === 1) {
        // Set TTL 15 phút (EN: Set 15 mins TTL)
        await this.redisService.expire(failKey, this.FAIL_TTL);
      }

      const remainingTries = this.FAIL_LIMIT - currentFails;
      
      // Nếu đã hết lượt (EN: If no more tries)
      if (remainingTries <= 0) {
        throw new ForbiddenException(
          'Bạn đã nhập sai quá 5 lần. Tính năng xác thực bị khóa trong 15 phút.',
        );
      }

      throw new BadRequestException(
        `Mã OTP không chính xác. Bạn còn ${remainingTries} lần thử.`,
      );
    }

    // 4. Nếu đúng: Xóa OTP và bộ đếm lỗi (EN: If correct: Clear OTP and fail counter)
    await this.redisService.del(otpKey);
    await this.redisService.del(failKey);

    return {
      success: true,
      message: 'Xác thực OTP thành công!',
    };
  }
}
