/**
 * AppModule — dang ky cac thanh phan cua feature App.
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
 * Root module gom Users + Mail feature cho bÃ i há»c gá»­i email.
 * (EN: Root module composing user registration and mail delivery features.)
 */
@Module({
    imports: [
        // Náº¡p biáº¿n mÃ´i trÆ°á»ng toÃ n app Ä‘á»ƒ module khÃ¡c dÃ¹ng ConfigService (EN: global env config bootstrap).
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MailModule,
        UsersModule,
    ],
})
export class AppModule {}
