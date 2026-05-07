/**
 * UsersModule — đăng ký các thành phần của feature Users.
 * (EN: UsersModule — registers components for Users feature.)
 */
import {
    Module,
} from "@nestjs/common"
import {
    MailModule,
} from "../mail"
import {
    UsersController,
} from "./users.controller"
import {
    UsersService,
} from "./users.service"

/**
 * Module gom controller/service cho flow đăng ký user.
 * (EN: Users feature module for registration API.)
 */
@Module({
    imports: [MailModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
