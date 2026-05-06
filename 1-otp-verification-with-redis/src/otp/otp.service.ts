/**
 * Service xu ly logic nghiep vu cua Otp.
 * (EN: Business logic service for Otp.)
 */
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
 * Service xá»­ lÃ½ logic OTP (Sinh mÃ£, Kiá»ƒm tra giá»›i háº¡n, XÃ¡c thá»±c)
 * (EN: OTP logic service - Generation, Rate limiting, Verification)
 */
@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  // Cáº¥u hÃ¬nh cÃ¡c háº±ng sá»‘ (EN: Constants configuration)
  private readonly OTP_TTL = 300; // 5 phÃºt (EN: 5 minutes)
  private readonly RETRY_LIMIT = 3; // Tá»‘i Ä‘a 3 láº§n gá»­i/phÃºt (EN: Max 3 sends/minute)
  private readonly RETRY_TTL = 60; // 1 phÃºt cháº·n spam (EN: 1 minute spam block)
  private readonly FAIL_LIMIT = 5; // Tá»‘i Ä‘a 5 láº§n nháº­p sai (EN: Max 5 failed attempts)
  private readonly FAIL_TTL = 900; // 15 phÃºt khÃ³a náº¿u sai quÃ¡ nhiá»u (EN: 15 minutes block)

  constructor(private redisService: RedisService) {}

  /**
   * Gá»­i mÃ£ OTP cho ngÆ°á»i dÃ¹ng
   * (EN: Send OTP to user)
   *
   * @param phone - Sá»‘ Ä‘iá»‡n thoáº¡i nháº­n mÃ£ (EN: Receiver phone number)
   * @returns Object chá»©a thÃ´ng bÃ¡o thÃ nh cÃ´ng (EN: Success message object)
   */
  async sendOtp(phone: string) {
    const retryKey = `retry:${phone}`;

    // 1. Kiá»ƒm tra giá»›i háº¡n gá»­i mÃ£ (EN: Check rate limit for sending)
    const retryCount = await this.redisService.get(retryKey);
    if (retryCount && parseInt(retryCount) >= this.RETRY_LIMIT) {
      // NÃ©m lá»—i 429 náº¿u spam (EN: Throw 429 if spamming)
      throw new HttpException(
        'Báº¡n Ä‘Ã£ gá»­i yÃªu cáº§u quÃ¡ nhiá»u láº§n. Vui lÃ²ng thá»­ láº¡i sau 1 phÃºt.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // 2. Sinh mÃ£ OTP 6 sá»‘ an toÃ n (EN: Generate secure 6-digit OTP)
    const otp = randomInt(100000, 999999).toString();

    // 3. LÆ°u OTP vÃ o Redis vá»›i TTL (EN: Save OTP to Redis with TTL)
    const otpKey = `otp:${phone}`;
    await this.redisService.set(otpKey, otp, this.OTP_TTL);

    // 4. Cáº­p nháº­t bá»™ Ä‘áº¿m gá»­i mÃ£ (EN: Update send retry counter)
    const currentRetry = await this.redisService.incr(retryKey);
    if (currentRetry === 1) {
      // Set TTL 1 phÃºt cho láº§n Ä‘áº§u (EN: Set 1 min TTL for first retry)
      await this.redisService.expire(retryKey, this.RETRY_TTL);
    }

    // 5. Log mÃ£ OTP ra terminal Ä‘á»ƒ debug (EN: Log OTP for debugging)
    this.logger.log(`[DEBUG] OTP for ${phone}: ${otp}`);

    return {
      message: 'OTP sent successfully',
      expiresIn: '5m',
    };
  }

  /**
   * XÃ¡c thá»±c mÃ£ OTP ngÆ°á»i dÃ¹ng nháº­p
   * (EN: Verify user-provided OTP)
   *
   * @param phone - Sá»‘ Ä‘iá»‡n thoáº¡i (EN: Phone number)
   * @param code - MÃ£ OTP ngÆ°á»i dÃ¹ng nháº­p (EN: User-entered code)
   */
  async verifyOtp(phone: string, code: string) {
    const failKey = `fails:${phone}`;

    // 1. Kiá»ƒm tra xem cÃ³ bá»‹ khÃ³a do nháº­p sai quÃ¡ nhiá»u khÃ´ng (EN: Check if blocked due to brute-force)
    const failCount = await this.redisService.get(failKey);
    if (failCount && parseInt(failCount) >= this.FAIL_LIMIT) {
      throw new ForbiddenException(
        'Báº¡n Ä‘Ã£ nháº­p sai quÃ¡ 5 láº§n. TÃ­nh nÄƒng xÃ¡c thá»±c bá»‹ khÃ³a trong 15 phÃºt.',
      );
    }

    // 2. Láº¥y mÃ£ OTP thá»±c táº¿ tá»« Redis (EN: Get actual OTP from Redis)
    const otpKey = `otp:${phone}`;
    const storedOtp = await this.redisService.get(otpKey);

    // 3. So sÃ¡nh mÃ£ (EN: Compare codes)
    if (!storedOtp || storedOtp !== code) {
      // TÄƒng biáº¿n Ä‘áº¿m sai (EN: Increment fail counter)
      const currentFails = await this.redisService.incr(failKey);
      if (currentFails === 1) {
        // Set TTL 15 phÃºt (EN: Set 15 mins TTL)
        await this.redisService.expire(failKey, this.FAIL_TTL);
      }

      const remainingTries = this.FAIL_LIMIT - currentFails;
      
      // Náº¿u Ä‘Ã£ háº¿t lÆ°á»£t (EN: If no more tries)
      if (remainingTries <= 0) {
        throw new ForbiddenException(
          'Báº¡n Ä‘Ã£ nháº­p sai quÃ¡ 5 láº§n. TÃ­nh nÄƒng xÃ¡c thá»±c bá»‹ khÃ³a trong 15 phÃºt.',
        );
      }

      throw new BadRequestException(
        `MÃ£ OTP khÃ´ng chÃ­nh xÃ¡c. Báº¡n cÃ²n ${remainingTries} láº§n thá»­.`,
      );
    }

    // 4. Náº¿u Ä‘Ãºng: XÃ³a OTP vÃ  bá»™ Ä‘áº¿m lá»—i (EN: If correct: Clear OTP and fail counter)
    await this.redisService.del(otpKey);
    await this.redisService.del(failKey);

    return {
      success: true,
      message: 'XÃ¡c thá»±c OTP thÃ nh cÃ´ng!',
    };
  }
}
