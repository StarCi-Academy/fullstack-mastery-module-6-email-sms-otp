import {
    IsNotEmpty, IsString, Matches 
} from "class-validator"

/**
 * DTO yêu cầu gửi tin nhắn SMS
 * (EN: Request DTO for sending SMS)
 */
export class SendSmsDto {
  /**
   * Số điện thoại định dạng quốc tế (VD: +84...)
   * (EN: Phone number in international format)
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/,
      {
          message: "Phone number must be in E.164 format (e.g., +84987654321)",
      })
      phone: string

  /**
   * Nội dung tin nhắn
   * (EN: Message content)
   */
  @IsString()
  @IsNotEmpty()
      message: string
}
