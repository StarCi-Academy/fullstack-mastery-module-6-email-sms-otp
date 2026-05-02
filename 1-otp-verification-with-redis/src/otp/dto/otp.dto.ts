import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

/**
 * DTO yêu cầu gửi mã OTP
 * (EN: Request DTO for sending OTP)
 */
export class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  @Length(10, 11)
  phone: string;
}

/**
 * DTO xác thực mã OTP
 * (EN: Request DTO for verifying OTP)
 */
export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  @Length(10, 11)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
