import { HandlerInput } from "ask-sdk";

export class RuntimeStateService {


    /**
     * Return the runtime state
     * @static
     * @param {HandlerInput} handlerInput
     * @returns {string}
     * @memberof RuntimeStateService
     */
    static getRuntimeState(handlerInput: HandlerInput): string {
        const { attributesManager } = handlerInput;
        let sessionAttributes = attributesManager.getSessionAttributes();
        return sessionAttributes['runtimeState'];
    }


    /**
     * Update the runtime state
     * @static
     * @param {HandlerInput} handlerInput
     * @param {string} newState
     * @memberof RuntimeStateService
     */
    static updateRuntimeState(handlerInput: HandlerInput, newState: string): void {
        const { attributesManager } = handlerInput;
        let sessionAttributes = attributesManager.getSessionAttributes();
        sessionAttributes['runtimeState'] = newState;
        attributesManager.setSessionAttributes(sessionAttributes);
        attributesManager.setPersistentAttributes(sessionAttributes);
    }

}