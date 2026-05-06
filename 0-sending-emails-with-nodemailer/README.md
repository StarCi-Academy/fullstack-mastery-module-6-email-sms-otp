# Sending Emails with Nodemailer

Demo NestJS gửi email HTML bằng **Nodemailer + `@nestjs-modules/mailer` + Handlebars (hbs)**, dùng SMTP của Brevo.

## 1. Điều kiện cần

- Node.js >= 18
- Tài khoản Brevo và SMTP credentials (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`)

## 2. Setup

Clone module đúng tên:

```bash
# Bước 1: Clone repository demo về máy local
git clone https://github.com/StarCi-Academy/fullstack-mastery-module-6-email-sms-otp.git

# Bước 2: Di chuyển vào thư mục bài học
cd fullstack-mastery-module-6-email-sms-otp/0-sending-emails-with-nodemailer
```

Sau đó cài dependencies:

```bash
npm install
```

Tạo file env:

```bash
cp .env.example .env
```

Điền giá trị SMTP thật từ Brevo.

## 3. Chạy ứng dụng

```bash
npm run start:dev
```

Server mặc định chạy tại `http://localhost:3000`.

## 4. System flow

```text
Client
  -> POST /users/register
    -> UsersController.register()
      -> UsersService.register()
        -> MailService.sendWelcomeEmail()
          -> MailerService + Handlebars render welcome.hbs
            -> Brevo SMTP
              -> Inbox người dùng
```

## 5. Test theo lesson

```bash
curl -s -X POST "http://localhost:3000/users/register" \
     -H "Content-Type: application/json" \
     -d "{\"email\": \"your-real-email@gmail.com\", \"name\": \"Học viên StarCi\"}"
```

Kết quả mong đợi (HTTP 201):

```json
{
  "message": "User registered successfully. Welcome email sent."
}
```

Sau đó kiểm tra inbox để thấy email tiêu đề `Chào mừng đến với StarCi Academy`.

## 6. Cấu trúc chính

- `src/modules/mail/mail.module.ts`: cấu hình SMTP + template engine.
- `src/modules/mail/mail.service.ts`: gửi email qua `MailerService`.
- `src/modules/mail/templates/welcome.hbs`: template HTML động.
- `src/modules/users/users.controller.ts`: API `/users/register`.
- `src/modules/users/users.service.ts`: nghiệp vụ gọi `sendWelcomeEmail`.

## 7. Ghi chú

- Demo này tập trung vào flow gửi mail; chưa tích hợp DB user.
- Ở production, nên tách gửi mail sang queue để tránh chặn response API.
