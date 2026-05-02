import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Hàm khởi chạy ứng dụng NestJS
 * (EN: Main function to bootstrap NestJS application)
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Validation toàn cục (EN: Global validation configuration)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 SMS Integration Service is running on: http://localhost:${port}`);
}

bootstrap();
