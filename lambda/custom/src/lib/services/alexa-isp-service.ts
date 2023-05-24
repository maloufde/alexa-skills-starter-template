import { HandlerInput } from "ask-sdk";
import { services } from "ask-sdk-model";
import { IConsumable } from '../consumables/i-consumable';

export class AlexaISPService {

    handlerInput: HandlerInput;
    serviceClientFactory: services.ServiceClientFactory | undefined;
    monetizationService: services.monetization.MonetizationServiceClient | undefined;
    locale: string;

    constructor(handlerInput: HandlerInput) {
        this.handlerInput = handlerInput;
        this.serviceClientFactory = this.handlerInput.serviceClientFactory;
        this.monetizationService = this.serviceClientFactory ? this.serviceClientFactory.getMonetizationServiceClient()
                                                             : undefined;
        this.locale = handlerInput.requestEnvelope.request.locale || '';
    }


    /**
     * Fetches all in-skill products
     * @returns {Promise<Array<IConsumable>>}
     * @memberof AlexaISPService
     */
    fetchInSkillProducts(): Promise<Array<IConsumable>> {
        return new Promise((resolve, reject) => {
            if (this.monetizationService) {
               this.monetizationService.getInSkillProducts(this.locale).then(
                   (getInSkillProductResponse) => {
                    resolve(getInSkillProductResponse.inSkillProducts);
                   },
                   (getInSkillProductError) => {
                     reject(getInSkillProductError);
                   }
               ) 
            }
        })
    }

}