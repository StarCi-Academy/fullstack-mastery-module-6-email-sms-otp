import {
    Inject, Injectable 
} from "@nestjs/common"
import {
    ISmsProvider, SMS_PROVIDER 
} from "./interfaces/sms-provider.interface"

/**
 * Service trung tâm quản lý logic gửi tin nhắn
 * (EN: Central service for managing SMS sending logic)
 */
@Injectable()
export class SmsService {
    constructor(
    // Tiêm phụ thuộc vào Interface (Abstraction) chứ không phải Class cụ thể
    // (EN: Inject dependency on Interface instead of concrete Class)
    @Inject(SMS_PROVIDER) private readonly smsProvider: ISmsProvider,
    ) {}

    /**
   * Gửi tin nhắn SMS thông qua nhà cung cấp đã cấu hình
   * (EN: Send an SMS via the configured provider)
   *
   * @param to - Người nhận (EN: Receiver)
   * @param message - Nội dung (EN: Content)
   */
    async sendSms(to: string, message: string) {
    // Chuyển giao yêu cầu cho Provider xử lý (EN: Delegate request to Provider)
        const providerId = await this.smsProvider.sendSms(to,
            message)

        return {
            message: "SMS dispatched successfully",
            providerId: providerId,
        }
    }
}
