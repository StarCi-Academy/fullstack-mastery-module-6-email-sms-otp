# Integrating SMS Gateways

Hướng dẫn tích hợp dịch vụ SMS (Twilio) vào ứng dụng NestJS sử dụng **Provider Pattern** để đảm bảo khả năng mở rộng và linh hoạt.

## 🚀 Tính năng chính

- **Provider Pattern:** Cô lập logic của bên thứ ba (Twilio SDK) đằng sau một Interface (`ISmsProvider`).
- **Dependency Inversion:** `SmsService` phụ thuộc vào Abstraction, giúp dễ dàng thay đổi nhà cung cấp (Twilio, Vonage, Viettel...) mà không sửa code nghiệp vụ.
- **Dynamic Provider Factory:** Tự động chuyển đổi giữa `TwilioSmsProvider` và `MockSmsProvider` thông qua biến môi trường.
- **Secure Configuration:** Quản lý SID/AuthToken qua biến môi trường an toàn.

## 🛠️ Cấu trúc thư mục

```text
src/
├── sms/
│   ├── interfaces/     # Định nghĩa contract chung
│   ├── providers/      # Các triển khai cụ thể (Twilio, Mock)
│   ├── dto/            # Validation dữ liệu đầu vào
│   ├── sms.service.ts  # Logic nghiệp vụ trung tâm
│   ├── sms.controller.ts
│   └── sms.module.ts   # Cấu hình Dependency Injection linh hoạt
├── app.module.ts
└── main.ts
```

## ⚙️ Hướng dẫn cài đặt

### 1. Chuẩn bị môi trường
Copy file `.env.example` thành `.env` và điền thông tin Twilio nếu muốn gửi tin thật:
```bash
cp .env.example .env
```

### 2. Cấu hình Provider
- Để dùng Twilio: Set `USE_TWILIO=true` và điền `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`.
- Để dùng Mock (In log ra console): Set `USE_TWILIO=false`.

### 3. Khởi chạy App
```bash
npm install
npm run start:dev
```

## 🧪 Hướng dẫn Kiểm thử (Testing)

### Luồng 1: Gửi SMS (Mock hoặc Twilio)
Sử dụng `curl` để gọi API gửi tin nhắn:

```bash
curl -X POST http://localhost:3000/sms/send \
     -H "Content-Type: application/json" \
     -d '{
       "phone": "+84987654321",
       "message": "Chao mung ban den voi StarCi Academy!"
     }'
```

- Nếu `USE_TWILIO=false`: Kiểm tra terminal log để thấy nội dung tin nhắn.
- Nếu `USE_TWILIO=true`: Kiểm tra điện thoại cá nhân (phải là số đã Verified trên Twilio Console).

---
*Phát triển bởi StarCi Academy - Gold Standard Curriculum.*
