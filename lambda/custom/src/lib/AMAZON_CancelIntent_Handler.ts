import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelper } from './services/message-helper-service';
import { RandomMessageTypes } from './speech/enums/random-message-types.enum';

export class AmazonCancelIntentHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent';
    }

    async handle(handlerInput: HandlerInput): Promise<Response> {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder.speak(SpeechHelper.randomMessage(RandomMessageTypes.EXIT))
                       .withShouldEndSession(true)
                       .getResponse();
    }   
}