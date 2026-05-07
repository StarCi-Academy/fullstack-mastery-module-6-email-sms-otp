/**
 * Controller REST cho feature Otp.
 * (EN: REST controller for Otp feature.)
 */
import {
    Body, Controller, Post 
} from "@nestjs/common"
import {
    OtpService 
} from "./otp.service"
import {
    SendOtpDto, VerifyOtpDto 
} from "./dto"

/**
 * Controller cung cấp các endpoint cho tính năng OTP
 * (EN: Controller providing endpoints for OTP features)
 */
@Controller("otp")
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

  /**
   * API Gửi mã OTP (Rate Limit: 3 lần/phút)
   * (EN: Send OTP API - Rate Limit: 3 times/min)
   *
   * @param sendOtpDto - Dữ liệu số điện thoại (EN: Phone number data)
   */
  @Post("send")
    async send(@Body() sendOtpDto: SendOtpDto) {
    // Gọi service xử lý gửi OTP (EN: Call service to handle sending OTP)
        return await this.otpService.sendOtp(sendOtpDto.phone)
    }

  /**
   * API Xác thực mã OTP (Khóa 15p nếu sai 5 lần)
   * (EN: Verify OTP API - Block 15m if 5 fails)
   *
   * @param verifyOtpDto - Dữ liệu số điện thoại và mã (EN: Phone and code data)
   */
  @Post("verify")
  async verify(@Body() verifyOtpDto: VerifyOtpDto) {
      // Gọi service xử lý xác thực (EN: Call service to handle verification)
      return await this.otpService.verifyOtp(verifyOtpDto.phone,
          verifyOtpDto.code)
  }
}
