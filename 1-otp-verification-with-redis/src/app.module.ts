/**
 * AppModule — dang ky cac thanh phan cua feature App.
 * (EN: AppModule — registers components for App feature.)
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis';
import { OtpModule } from './otp';

/**
 * Module gá»‘c cá»§a á»©ng dá»¥ng (Root Module)
 * (EN: Application's root module)
 */
@Module({
  imports: [
    // Load biáº¿n mÃ´i trÆ°á»ng (EN: Load environment variables)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TÃ­ch há»£p module Redis (EN: Integrate Redis module)
    RedisModule,
    // TÃ­ch há»£p module OTP (EN: Integrate OTP module)
    OtpModule,
  ],
})
export class AppModule {}
