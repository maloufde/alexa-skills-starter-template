import { HandlerInput,
         ResponseInterceptor } from "ask-sdk";

export class GlobalResponseInterceptor implements ResponseInterceptor {
    process(handlerInput: HandlerInput) {
        // do work
    }
}