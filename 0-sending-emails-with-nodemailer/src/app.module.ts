import {
    appConfig 
} from "./config"
/**
 * AppModule — đăng ký các thành phần của feature App.
 * (EN: AppModule — registers components for App feature.)
 */
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
 * Root module gom Users + Mail feature cho bÃ i há»c gửi email.
 * (EN: Root module composing user registration and mail delivery features.)
 */
@Module({
    imports: [
        // Nạp biến môi trưá»ng toÃ n app để module khác dùng ConfigService (EN: global env config bootstrap).
        ConfigModule.forRoot({
            isGlobal: true, load: [appConfig] 
        }),
        MailModule,
        UsersModule,
    ],
})
export class AppModule {}
