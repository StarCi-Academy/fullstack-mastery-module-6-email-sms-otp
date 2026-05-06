/**
 * RedisModule — dang ky cac thanh phan cua feature Redis.
 * (EN: RedisModule — registers components for Redis feature.)
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

/**
 * Module quáº£n lÃ½ Redis, Ä‘Æ°á»£c cáº¥u hÃ¬nh Global Ä‘á»ƒ dÃ¹ng á»Ÿ má»i nÆ¡i
 * (EN: Redis management module, configured as Global for universal use)
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
