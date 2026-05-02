import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis';
import { OtpModule } from './otp';

/**
 * Module gốc của ứng dụng (Root Module)
 * (EN: Application's root module)
 */
@Module({
  imports: [
    // Load biến môi trường (EN: Load environment variables)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Tích hợp module Redis (EN: Integrate Redis module)
    RedisModule,
    // Tích hợp module OTP (EN: Integrate OTP module)
    OtpModule,
  ],
})
export class AppModule {}
