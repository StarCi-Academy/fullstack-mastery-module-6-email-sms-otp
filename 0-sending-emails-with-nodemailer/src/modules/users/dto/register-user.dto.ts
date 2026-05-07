/**
 * DTO validate payload dang ky.
 * (EN: DTO validates sign-up payload.)
 */
import {
    IsEmail,
    IsString,
    MinLength,
} from "class-validator"

/** DTO nhận payload đăng ký user để gửi welcome mail. (EN: Registration payload DTO.) */
export class RegisterUserDto {
    @IsEmail()
        email: string

    @IsString()
    @MinLength(1)
        name: string
}
