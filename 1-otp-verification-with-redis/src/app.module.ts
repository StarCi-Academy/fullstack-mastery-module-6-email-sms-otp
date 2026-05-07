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
    appConfig, redisConfig 
} from "./config"
import {
    OtpModule, RedisModule 
} from "./modules"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, load: [appConfig,
                redisConfig] 
        }),
        RedisModule,
        OtpModule,
    ],
})
export class AppModule {}