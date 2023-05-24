import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelper } from '../lib/services/message-helper-service';
import { RandomMessageTypes } from '../lib/speech/enums/random-message-types.enum';

export class LaunchRequestHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    }

    async handle(handlerInput: HandlerInput): Promise<Response> {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder.speak(SpeechHelper.randomMessage(RandomMessageTypes.WELCOME))
        .withShouldEndSession(true)
        .getResponse();
    }   
}