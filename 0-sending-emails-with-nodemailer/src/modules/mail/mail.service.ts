/**
 * Service xu ly logic nghiep vu cua Mail.
 * (EN: Business logic service for Mail.)
 */
import {
    Injectable,
    Logger,
} from "@nestjs/common"
import {
    MailerService,
} from "@nestjs-modules/mailer"

/**
 * Service gửi email transactional dùng template Handlebars.
 * (EN: Transactional email sender powered by Nest Mailer + Handlebars.)
 */
@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)

    constructor(private readonly mailerService: MailerService) {}

    /**
     * Gửi welcome email sau khi user đăng ký thÃ nh công.
     * (EN: Sends welcome email after successful registration.)
     *
     * @param recipientEmail - Email người nhận (EN: receiver inbox address).
     * @param recipientName - Tên hiển thị trên template (EN: display name in template).
     * @returns Promise<void> - Resolve khi SMTP provider chấp nhận message.
     */
    async sendWelcomeEmail(recipientEmail: string, recipientName: string): Promise<void> {
        // Chuẩn hóa dữ liệu hiển thị để tránh render tên rỗng trong template (EN: normalize fallback name before rendering).
        const safeName = recipientName.trim() || "Học viên StarCi"
        await this.mailerService.sendMail({
            to: recipientEmail,
            subject: "ChÃ o mừng đến với StarCi Academy",
            template: "welcome",
            context: {
                name: safeName,
            },
        })
        // Ghi log context để debug vận hÃ nh SMTP mÃ  không lộ secret (EN: operational visibility without exposing credentials).
        this.logger.log({
            message: "Welcome email accepted by SMTP provider",
            recipientEmail,
        })
    }
}
