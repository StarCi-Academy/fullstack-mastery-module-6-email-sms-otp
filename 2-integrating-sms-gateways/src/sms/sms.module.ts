import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SMS_PROVIDER } from './interfaces/sms-provider.interface';
import { TwilioSmsProvider, MockSmsProvider } from './providers';

/**
 * Module quản lý tính năng SMS và cấu hình Provider linh hoạt
 * (EN: SMS feature module with flexible Provider configuration)
 */
@Module({
  controllers: [SmsController],
  providers: [
    SmsService,
    {
      // Sử dụng Token làm định danh DI (EN: Use Token as DI identifier)
      provide: SMS_PROVIDER,
      // Factory để lựa chọn Provider dựa trên biến môi trường (EN: Factory to choose Provider based on ENV)
      useFactory: (configService: ConfigService) => {
        const useTwilio = configService.get<string>('USE_TWILIO') === 'true';
        return useTwilio ? new TwilioSmsProvider(configService) : new MockSmsProvider();
      },
      inject: [ConfigService],
    },
  ],
  exports: [SmsService],
})
export class SmsModule {}
