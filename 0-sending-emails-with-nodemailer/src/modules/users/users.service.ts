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
 * Nghiệp vụ đăng ký user (demo) và trigger welcome email.
 * (EN: Demo registration workflow that triggers welcome email.)
 */
@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)

    constructor(private readonly mailService: MailService) {}

    /**
     * Xử lý đăng ký user và gửi email chÃ o mừng.
     * (EN: Handles registration and sends welcome email.)
     *
     * @param payload - Dữ liệu đăng ký gồm email/name (EN: registration payload).
     * @returns Promise<{ message: string }> - Response đúng format lesson.
     */
    async register(payload: RegisterUserDto): Promise<{ message: string }> {
        // Demo bÃ i học chưa cần DB, nên xem bước nÃ y lÃ  "đã lưu user thÃ nh công" (EN: persistence intentionally omitted for this lesson).
        const normalizedEmail = payload.email.trim().toLowerCase()
        // Gọi mail service để render template + gửi SMTP qua Brevo (EN: send transactional welcome email).
        await this.mailService.sendWelcomeEmail(normalizedEmail,
            payload.name)
        // Structured log để theo dõi flow register -> send mail (EN: operational trace for demo flow).
        this.logger.log({
            message: "User registered and welcome email sent",
            email: normalizedEmail,
        })
        return {
            message: "User registered successfully. Welcome email sent.",
        }
    }
}
