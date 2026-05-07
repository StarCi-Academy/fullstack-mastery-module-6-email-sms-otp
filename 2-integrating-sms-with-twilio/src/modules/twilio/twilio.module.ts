/**
 * TwilioModule — đăng ký TwilioService + TwilioController.
 * (EN: TwilioModule — registers service and controller for SMS sending.)
 */
import {
    Module,
} from "@nestjs/common"
import {
    TwilioController,
} from "./twilio.controller"
import {
    TwilioService,
} from "./twilio.service"

@Module({
    controllers: [TwilioController],
    providers: [TwilioService],
    exports: [TwilioService],
})
export class TwilioModule {}
