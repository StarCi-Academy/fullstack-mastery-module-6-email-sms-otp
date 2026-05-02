# OTP Verification with Redis

Hệ thống xác thực mã OTP an toàn sử dụng Redis để quản lý vòng đời mã, chống spam (Rate Limiting) và chống dò mã (Brute-force protection).

## 🚀 Tính năng chính

- **OTP Lifecycle Management:** Sử dụng Redis TTL để tự động hủy mã sau 5 phút.
- **Anti-Spam (Rate Limiting):** Giới hạn tối đa 3 lần yêu cầu gửi mã trong vòng 1 phút.
- **Brute-force Protection:** Tự động khóa tính năng xác thực trong 15 phút nếu người dùng nhập sai quá 5 lần liên tiếp.
- **Secure Generation:** Sử dụng `crypto.randomInt` của Node.js để sinh mã 6 chữ số khó đoán.

## 🛠️ Cấu trúc thư mục

```text
src/
├── redis/             # Module kết nối Redis
├── otp/               # Module xử lý logic OTP
│   ├── dto/           # Data Transfer Objects (Validation)
│   ├── otp.service.ts # Logic gửi & xác thực (Chặn spam/Brute-force)
│   └── otp.controller.ts
├── app.module.ts
└── main.ts
.docker/
└── redis.yaml         # Cấu hình Docker Redis
```

## ⚙️ Hướng dẫn cài đặt

### 1. Chuẩn bị môi trường
Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

### 2. Khởi chạy Redis (Docker)
Sử dụng Docker Compose để chạy Redis:
```bash
docker compose -f .docker/redis.yaml up -d
```

### 3. Cài đặt dependencies và chạy App
```bash
npm install
npm run start:dev
```

## 🧪 Hướng dẫn Kiểm thử (Testing)

### Luồng 1: Chặn Spam (Rate Limiting)
Gửi yêu cầu OTP quá 3 lần/phút.

```bash
# Lần 1: Thành công
curl -X POST http://localhost:3000/otp/send -H "Content-Type: application/json" -d '{"phone": "0987654321"}'

# Gọi liên tục lần 4: Bị chặn (429 Too Many Requests)
```

### Luồng 2: Chặn Brute-force
Nhập sai OTP quá 5 lần.

```bash
# Nhập sai lần 1-4: Trả về số lần còn lại (400 Bad Request)
curl -X POST http://localhost:3000/otp/verify -H "Content-Type: application/json" -d '{"phone": "0987654321", "code": "000000"}'

# Nhập sai lần 5: Khóa 15 phút (403 Forbidden)
```

---
*Phát triển bởi StarCi Academy - Gold Standard Curriculum.*
