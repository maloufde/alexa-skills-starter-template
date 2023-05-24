import { HandlerInput, ErrorHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelper } from '../lib/services/message-helper-service';
import { RandomMessageTypes } from '../lib/speech/enums/random-message-types.enum';

export class CustomErrorHandler implements ErrorHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        return true;
    }

    async handle(handlerInput: HandlerInput, error: Error): Promise<Response> {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak(SpeechHelper.randomMessage(RandomMessageTypes.GENERIC_ERROR))
            .reprompt(SpeechHelper.randomMessage(RandomMessageTypes.GENERIC_ERROR))
            .getResponse();
    }   
}