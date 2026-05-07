/**
 * RedisModule — đăng ký các thành phần của feature Redis.
 * (EN: RedisModule — registers components for Redis feature.)
 */
import {
    Global, Module 
} from "@nestjs/common"
import {
    ConfigModule 
} from "@nestjs/config"
import {
    RedisService 
} from "./redis.service"

/**
 * Module quản lý Redis, được cấu hình Global để dùng ở mọi nơi
 * (EN: Redis management module, configured as Global for universal use)
 */
@Global()
@Module({
    imports: [ConfigModule],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
