/**
 * Khởi tạo Nest app — ValidationPipe toàn cục + ConfigService port.
 * (EN: Bootstrap Nest app — global ValidationPipe + ConfigService port.)
 */
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

export async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    // Bật validation toàn cục để chặn payload sai schema ngay ở entrypoint.
    // (EN: Enforce DTO contracts globally.)
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    const configService = app.get(ConfigService)
    const port = Number(configService.get<string>("PORT") ?? 3000)
    await app.listen(port, "0.0.0.0")
}
