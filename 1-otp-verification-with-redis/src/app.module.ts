/**
 * AppModule — đăng ký các thành phần của feature App.
 * (EN: AppModule — registers components for App feature.)
 */
import {
    Module 
} from "@nestjs/common"
import {
    ConfigModule 
} from "@nestjs/config"
import {
    RedisModule 
} from "./redis"
import {
    OtpModule 
} from "./otp"

/**
 * Module gốc của ứng dụng (Root Module)
 * (EN: Application's root module)
 */
@Module({
    imports: [
    // Load biến môi trường (EN: Load environment variables)
        ConfigModule.forRoot({
            isGlobal: true, load: [appConfig,
                redisConfig] 
        }),
        // Tích hợp module Redis (EN: Integrate Redis module)
        RedisModule,
        // Tích hợp module OTP (EN: Integrate OTP module)
        OtpModule,
    ],
})
export class AppModule {}
