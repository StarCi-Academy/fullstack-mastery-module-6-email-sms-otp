/**
 * OtpModule — dang ky cac thanh phan cua feature Otp.
 * (EN: OtpModule — registers components for Otp feature.)
 */
import {
    Module 
} from "@nestjs/common"
import {
    OtpController 
} from "./otp.controller"
import {
    OtpService 
} from "./otp.service"

/**
 * Module quản lý tính năng OTP
 * (EN: OTP feature management module)
 */
@Module({
    controllers: [OtpController],
    providers: [OtpService],
})
export class OtpModule {}
