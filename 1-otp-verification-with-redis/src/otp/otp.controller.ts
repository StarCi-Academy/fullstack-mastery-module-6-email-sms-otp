/**
 * Controller REST cho feature Otp.
 * (EN: REST controller for Otp feature.)
 */
import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendOtpDto, VerifyOtpDto } from './dto';

/**
 * Controller cung cáº¥p cÃ¡c endpoint cho tÃ­nh nÄƒng OTP
 * (EN: Controller providing endpoints for OTP features)
 */
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  /**
   * API Gá»­i mÃ£ OTP (Rate Limit: 3 láº§n/phÃºt)
   * (EN: Send OTP API - Rate Limit: 3 times/min)
   *
   * @param sendOtpDto - Dá»¯ liá»‡u sá»‘ Ä‘iá»‡n thoáº¡i (EN: Phone number data)
   */
  @Post('send')
  async send(@Body() sendOtpDto: SendOtpDto) {
    // Gá»i service xá»­ lÃ½ gá»­i OTP (EN: Call service to handle sending OTP)
    return await this.otpService.sendOtp(sendOtpDto.phone);
  }

  /**
   * API XÃ¡c thá»±c mÃ£ OTP (KhÃ³a 15p náº¿u sai 5 láº§n)
   * (EN: Verify OTP API - Block 15m if 5 fails)
   *
   * @param verifyOtpDto - Dá»¯ liá»‡u sá»‘ Ä‘iá»‡n thoáº¡i vÃ  mÃ£ (EN: Phone and code data)
   */
  @Post('verify')
  async verify(@Body() verifyOtpDto: VerifyOtpDto) {
    // Gá»i service xá»­ lÃ½ xÃ¡c thá»±c (EN: Call service to handle verification)
    return await this.otpService.verifyOtp(verifyOtpDto.phone, verifyOtpDto.code);
  }
}
