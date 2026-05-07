import {
    Body, Controller, Post 
} from "@nestjs/common"
import {
    SmsService 
} from "./sms.service"
import {
    SendSmsDto 
} from "./dto/send-sms.dto"

/**
 * Controller cung cấp API để gửi tin nhắn SMS
 * (EN: Controller providing API for sending SMS messages)
 */
@Controller("sms")
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

  /**
   * Endpoint gửi tin nhắn chào mừng hoặc thông báo
   * (EN: Endpoint for sending welcome or notification messages)
   *
   * @param sendSmsDto - Dữ liệu yêu cầu (EN: Request data)
   */
  @Post("send")
    async sendSms(@Body() sendSmsDto: SendSmsDto) {
    // Gọi service xử lý gửi tin (EN: Call service to handle sending)
        return await this.smsService.sendSms(sendSmsDto.phone,
            sendSmsDto.message)
    }
}
