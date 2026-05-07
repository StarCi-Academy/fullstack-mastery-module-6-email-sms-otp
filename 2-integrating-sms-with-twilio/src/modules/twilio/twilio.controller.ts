/**
 * Controller REST cho feature Twilio SMS.
 * (EN: REST controller for Twilio SMS feature.)
 */
import {
    Body, Controller, Post,
} from "@nestjs/common"
import {
    TwilioService,
} from "./twilio.service"
import {
    SendSmsDto,
} from "./dto"

@Controller("sms")
export class TwilioController {
    constructor(private readonly twilioService: TwilioService) {}

    /**
     * Gửi tin nhắn SMS qua Twilio.
     * (EN: Send an SMS via Twilio.)
     */
    @Post("send")
    async sendSms(@Body() dto: SendSmsDto) {
        const sid = await this.twilioService.sendSms(dto.phone, dto.message)
        return {
            message: "SMS sent successfully",
            sid,
        }
    }
}
