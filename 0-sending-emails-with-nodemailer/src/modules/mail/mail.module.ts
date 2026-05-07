/**
 * MailModule — đăng ký các thành phần của feature Mail.
 * (EN: MailModule — registers components for Mail feature.)
 */
import {
    Module,
} from "@nestjs/common"
import {
    ConfigService,
} from "@nestjs/config"
import {
    MailerModule,
} from "@nestjs-modules/mailer"
import {
    HandlebarsAdapter,
} from "@nestjs-modules/mailer/adapters/handlebars.adapter"
import {
    join,
} from "path"
import {
    MailService,
} from "./mail.service"

/**
 * Cấu hình SMTP + Handlebars template cho nghiệp vụ gửi email.
 * (EN: Configures SMTP transport and Handlebars template rendering.)
 */
@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>("SMTP_HOST"),
                    port: Number(configService.get<string>("SMTP_PORT") ?? 587),
                    secure: false,
                    auth: {
                        user: configService.get<string>("SMTP_USER"),
                        pass: configService.get<string>("SMTP_PASSWORD"),
                    },
                },
                defaults: {
                    from: configService.get<string>("MAIL_FROM") ?? "\"No Reply\" <noreply@starci.net>",
                },
                template: {
                    dir: join(process.cwd(),
                        "dist",
                        "src",
                        "modules",
                        "mail",
                        "templates"
                    ),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
