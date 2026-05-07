import {
    Injectable, Logger 
} from "@nestjs/common"
import {
    ISmsProvider 
} from "../interfaces/sms-provider.interface"

/**
 * Provider giả lập để dùng trong môi trường Phát triển/Kiểm thử
 * (EN: Mock provider for use in Development/Testing environments)
 */
@Injectable()
export class MockSmsProvider implements ISmsProvider {
    private readonly logger = new Logger(MockSmsProvider.name)

    /**
   * Giả lập gửi tin bằng cách in ra log terminal
   * (EN: Simulate sending by printing to terminal log)
   *
   * @param to - Số điện thoại (EN: Phone number)
   * @param message - Nội dung (EN: Message)
   */
    async sendSms(to: string, message: string): Promise<string> {
        const mockSid = `MOCK_SID_${Math.random().toString(36).substring(7).toUpperCase()}`

        this.logger.log("--- [MOCK SMS PROVIDER] ---")
        this.logger.log(`To: ${to}`)
        this.logger.log(`Message: ${message}`)
        this.logger.log(`SID: ${mockSid}`)
        this.logger.log("---------------------------")

        return mockSid
    }
}
