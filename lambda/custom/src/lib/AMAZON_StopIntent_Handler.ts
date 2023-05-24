import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelper } from '../lib/services/message-helper-service';
import { RandomMessageTypes } from '../lib/speech/enums/random-message-types.enum';

export class AmazonStopIntentHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';
    }

    async handle(handlerInput: HandlerInput): Promise<Response> {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder.speak(SpeechHelper.randomMessage(RandomMessageTypes.EXIT))
                       .withShouldEndSession(true)
                       .getResponse();
    }   
}