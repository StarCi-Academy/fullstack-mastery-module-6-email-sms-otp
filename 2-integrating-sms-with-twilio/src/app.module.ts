/**
 * AppModule — root module cho bài học Twilio SMS.
 * (EN: AppModule — root module for Twilio SMS lesson.)
 */
import {
    Module 
} from "@nestjs/common"
import {
    ConfigModule 
} from "@nestjs/config"
import {
    appConfig 
} from "./config"
import {
    TwilioModule 
} from "./modules"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, load: [appConfig] 
        }),
        TwilioModule,
    ],
})
export class AppModule {}