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
 * HTTP entrypoint cho flow Ä‘Äƒng kÃ½ user vÃ  gá»­i welcome email.
 * (EN: HTTP controller exposing registration endpoint for email demo.)
 */
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Endpoint lesson: POST /users/register.
     * (EN: Lesson endpoint to trigger welcome email flow.)
     *
     * @param payload - Request body gá»“m email vÃ  name (EN: email and name payload).
     * @returns Promise<{ message: string }> - Tráº£ thÃ´ng bÃ¡o thÃ nh cÃ´ng cho client.
     */
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() payload: RegisterUserDto): Promise<{ message: string }> {
        return this.usersService.register(payload)
    }
}
