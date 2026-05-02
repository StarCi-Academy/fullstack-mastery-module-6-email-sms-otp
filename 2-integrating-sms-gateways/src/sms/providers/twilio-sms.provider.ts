import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { ISmsProvider } from '../interfaces/sms-provider.interface';

/**
 * Triển khai gửi SMS qua dịch vụ Twilio
 * (EN: Implementation of SMS sending via Twilio service)
 */
@Injectable()
export class TwilioSmsProvider implements ISmsProvider {
  private readonly logger = new Logger(TwilioSmsProvider.name);
  private client: Twilio;

  constructor(private configService: ConfigService) {
    // Khởi tạo Twilio Client từ cấu hình (EN: Initialize Twilio Client from config)
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

    if (accountSid && authToken) {
      this.client = new Twilio(accountSid, authToken);
    }
  }

  /**
   * Gửi tin nhắn SMS thực tế qua Twilio SDK
   * (EN: Send an actual SMS via Twilio SDK)
   *
   * @param to - Số điện thoại nhận (EN: Receiver phone)
   * @param message - Nội dung (EN: Content)
   */
  async sendSms(to: string, message: string): Promise<string> {
    try {
      const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');

      // Gọi API Twilio để tạo tin nhắn (EN: Call Twilio API to create message)
      const response = await this.client.messages.create({
        body: message,
        from: from,
        to: to,
      });

      this.logger.log(`SMS sent successfully to ${to}. SID: ${response.sid}`);
      return response.sid;
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${to}`, error.stack);
      throw error;
    }
  }
}
