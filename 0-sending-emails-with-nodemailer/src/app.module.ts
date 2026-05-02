import {
    Module,
} from "@nestjs/common"
import {
    ConfigModule,
} from "@nestjs/config"
import {
    MailModule,
    UsersModule,
} from "./modules"

/**
 * Root module gom Users + Mail feature cho bài học gửi email.
 * (EN: Root module composing user registration and mail delivery features.)
 */
@Module({
    imports: [
        // Nạp biến môi trường toàn app để module khác dùng ConfigService (EN: global env config bootstrap).
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MailModule,
        UsersModule,
    ],
})
export class AppModule {}
