/**
 * Service gửi SMS trực tiếp qua Twilio SDK.
 * (EN: Service for sending SMS directly via Twilio SDK.)
 */
import {
    Injectable,
    Logger,
} from "@nestjs/common"
import {
    ConfigService,
} from "@nestjs/config"
import {
    Twilio,
} from "twilio"

@Injectable()
export class TwilioService {
    private readonly logger = new Logger(TwilioService.name)
    private readonly client: Twilio
    private readonly fromNumber: string

    constructor(private readonly configService: ConfigService) {
        const accountSid = this.configService.getOrThrow<string>("TWILIO_ACCOUNT_SID")
        const authToken = this.configService.getOrThrow<string>("TWILIO_AUTH_TOKEN")
        this.fromNumber = this.configService.getOrThrow<string>("TWILIO_PHONE_NUMBER")
        this.client = new Twilio(accountSid, authToken)
    }

    /**
     * Gửi một tin nhắn SMS qua Twilio.
     * (EN: Send an SMS message via Twilio.)
     *
     * @param to — Số điện thoại nhận, E.164 format (EN: receiver phone).
     * @param message — Nội dung tin nhắn (EN: message body).
     * @returns SID của tin nhắn đã tạo trên Twilio (EN: Twilio message SID).
     */
    async sendSms(to: string, message: string): Promise<string> {
        const response = await this.client.messages.create({
            body: message,
            from: this.fromNumber,
            to,
        })
        this.logger.log(`SMS sent to ${to} — SID: ${response.sid}`)
        return response.sid
    }
}
