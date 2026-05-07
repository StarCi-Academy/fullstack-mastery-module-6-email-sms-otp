import {
    IsNotEmpty, IsString, Matches 
} from "class-validator"

/**
 * DTO for sending an SMS via Twilio.
 * (EN: Request payload — phone in E.164 format + message body.)
 */
export class SendSmsDto {
    /**
     * Phone number in E.164 format (e.g., +84987654321).
     */
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{1,14}$/,
        {
            message: "Phone number must be in E.164 format (e.g., +84987654321)",
        })
        phone: string

    /**
     * Message content to send.
     */
    @IsString()
    @IsNotEmpty()
        message: string
}
