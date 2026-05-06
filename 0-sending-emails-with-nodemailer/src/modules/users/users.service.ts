/**
 * Service xu ly logic nghiep vu cua Users.
 * (EN: Business logic service for Users.)
 */
import {
    Injectable,
    Logger,
} from "@nestjs/common"
import {
    MailService,
} from "../mail"
import {
    RegisterUserDto,
} from "./dto/register-user.dto"

/**
 * Nghiá»‡p vá»¥ Ä‘Äƒng kÃ½ user (demo) vÃ  trigger welcome email.
 * (EN: Demo registration workflow that triggers welcome email.)
 */
@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)

    constructor(private readonly mailService: MailService) {}

    /**
     * Xá»­ lÃ½ Ä‘Äƒng kÃ½ user vÃ  gá»­i email chÃ o má»«ng.
     * (EN: Handles registration and sends welcome email.)
     *
     * @param payload - Dá»¯ liá»‡u Ä‘Äƒng kÃ½ gá»“m email/name (EN: registration payload).
     * @returns Promise<{ message: string }> - Response Ä‘Ãºng format lesson.
     */
    async register(payload: RegisterUserDto): Promise<{ message: string }> {
        // Demo bÃ i há»c chÆ°a cáº§n DB, nÃªn xem bÆ°á»›c nÃ y lÃ  "Ä‘Ã£ lÆ°u user thÃ nh cÃ´ng" (EN: persistence intentionally omitted for this lesson).
        const normalizedEmail = payload.email.trim().toLowerCase()
        // Gá»i mail service Ä‘á»ƒ render template + gá»­i SMTP qua Brevo (EN: send transactional welcome email).
        await this.mailService.sendWelcomeEmail(normalizedEmail, payload.name)
        // Structured log Ä‘á»ƒ theo dÃµi flow register -> send mail (EN: operational trace for demo flow).
        this.logger.log({
            message: "User registered and welcome email sent",
            email: normalizedEmail,
        })
        return {
            message: "User registered successfully. Welcome email sent.",
        }
    }
}
