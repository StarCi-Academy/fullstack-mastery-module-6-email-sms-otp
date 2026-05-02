import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Hàm khởi chạy ứng dụng NestJS
 * (EN: Main function to bootstrap NestJS application)
 */
async function bootstrap() {
  // Tạo instance ứng dụng (EN: Create application instance)
  const app = await NestFactory.create(AppModule);

  // Cấu hình Validation toàn cục (EN: Global validation configuration)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Xóa các field không được khai báo trong DTO (EN: Remove fields not in DTO)
    transform: true, // Tự động chuyển kiểu dữ liệu (EN: Auto type conversion)
  }));

  // Lắng nghe ở cổng 3000 (EN: Listen on port 3000)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Server is running on: http://localhost:${port}`);
}

// Chạy hàm bootstrap (EN: Run bootstrap function)
bootstrap();
