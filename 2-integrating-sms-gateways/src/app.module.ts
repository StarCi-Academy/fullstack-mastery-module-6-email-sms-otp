import {
    Module 
} from "@nestjs/common"
import {
    ConfigModule 
} from "@nestjs/config"
import {
    SmsModule 
} from "./sms"

/**
 * Module gốc của ứng dụng (Root Module)
 * (EN: Application's root module)
 */
@Module({
    imports: [
    // Load biến môi trường (EN: Load environment variables)
        ConfigModule.forRoot({
            isGlobal: true, load: [appConfig] 
        }),
        // Tích hợp module SMS (EN: Integrate SMS module)
        SmsModule,
    ],
})
export class AppModule {}
