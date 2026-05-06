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
 * Service gá»­i email transactional dÃ¹ng template Handlebars.
 * (EN: Transactional email sender powered by Nest Mailer + Handlebars.)
 */
@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)

    constructor(private readonly mailerService: MailerService) {}

    /**
     * Gá»­i welcome email sau khi user Ä‘Äƒng kÃ½ thÃ nh cÃ´ng.
     * (EN: Sends welcome email after successful registration.)
     *
     * @param recipientEmail - Email ngÆ°á»i nháº­n (EN: receiver inbox address).
     * @param recipientName - TÃªn hiá»ƒn thá»‹ trÃªn template (EN: display name in template).
     * @returns Promise<void> - Resolve khi SMTP provider cháº¥p nháº­n message.
     */
    async sendWelcomeEmail(recipientEmail: string, recipientName: string): Promise<void> {
        // Chuáº©n hÃ³a dá»¯ liá»‡u hiá»ƒn thá»‹ Ä‘á»ƒ trÃ¡nh render tÃªn rá»—ng trong template (EN: normalize fallback name before rendering).
        const safeName = recipientName.trim() || "Há»c viÃªn StarCi"
        await this.mailerService.sendMail({
            to: recipientEmail,
            subject: "ChÃ o má»«ng Ä‘áº¿n vá»›i StarCi Academy",
            template: "welcome",
            context: {
                name: safeName,
            },
        })
        // Ghi log context Ä‘á»ƒ debug váº­n hÃ nh SMTP mÃ  khÃ´ng lá»™ secret (EN: operational visibility without exposing credentials).
        this.logger.log({
            message: "Welcome email accepted by SMTP provider",
            recipientEmail,
        })
    }
}
