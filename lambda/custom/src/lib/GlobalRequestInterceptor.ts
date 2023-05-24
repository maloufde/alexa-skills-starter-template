import { HandlerInput,
         RequestInterceptor } from "ask-sdk";

export class GlobalRequestInterceptor implements RequestInterceptor {
    process(handlerInput: HandlerInput): void {
        // do work
    }
}         