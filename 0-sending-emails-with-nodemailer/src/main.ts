import {
    ValidationPipe,
} from "@nestjs/common"
import {
    ConfigService,
} from "@nestjs/config"
import {
    NestFactory,
} from "@nestjs/core"
import {
    AppModule,
} from "./app.module"

/**
 * Khởi động HTTP server cho demo gửi email với Brevo SMTP.
 * (EN: Bootstraps Nest HTTP server for Nodemailer/Brevo demo.)
 *
 * @returns Promise<void> - Resolve khi app bind xong cổng listen.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // Bật validation toàn cục để chặn payload sai schema ngay ở entrypoint (EN: enforce DTO contracts globally).
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    const configService = app.get(ConfigService)
    const port = Number(configService.get<string>("PORT") ?? 3000)
    await app.listen(port)
}

bootstrap()
