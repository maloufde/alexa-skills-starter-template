import { HandlerInput } from "ask-sdk";
import { Profile } from './profile';
import { StorageService } from '../services/storage-service';

export class SchemaHelper {
    static setInitialSchema(handlerInput: HandlerInput) {
        StorageService.setHybridPersistentAttributes(handlerInput, 'profile', Profile);
        // add additional default schemas
    }
}