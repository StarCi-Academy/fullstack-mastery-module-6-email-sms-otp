/**
 * Controller REST cho feature Users.
 * (EN: REST controller for Users feature.)
 */
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from "@nestjs/common"
import {
    RegisterUserDto,
} from "./dto/register-user.dto"
import {
    UsersService,
} from "./users.service"

/**
 * HTTP entrypoint cho flow đăng ký user và gửi welcome email.
 * (EN: HTTP controller exposing registration endpoint for email demo.)
 */
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Endpoint lesson: POST /users/register.
     * (EN: Lesson endpoint to trigger welcome email flow.)
     *
     * @param payload - Request body gồm email và name (EN: email and name payload).
     * @returns Promise<{ message: string }> - Trả thông báo thÃ nh công cho client.
     */
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() payload: RegisterUserDto): Promise<{ message: string }> {
        return this.usersService.register(payload)
    }
}
