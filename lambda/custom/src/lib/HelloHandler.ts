import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelper } from '../lib/services/message-helper-service';
import { RandomMessageTypes } from '../lib/speech/enums/random-message-types.enum';

export class HelloHandler implements RequestHandler {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'HelloWorldIntent';
    }

    async handle(handlerInput: HandlerInput): Promise<Response> {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
                       .speak('SAY SOMETHING')
                       .reprompt('SAY SOMETHING')
                       .withShouldEndSession(true)
                       .getResponse();
    }   
}