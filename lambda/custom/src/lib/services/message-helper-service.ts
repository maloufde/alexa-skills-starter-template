import * as _ from "lodash";
import { Speech } from '../speech/enums/speech';
import { CanonicalSSML } from '../speech/enums/canonical-ssml.enum';
export class SpeechHelper {
    static randomMessages: any = {
        "WELCOME": [
            CanonicalSSML.SKILL_FIRST_LAUNCH + Speech.welcome_0_0_0
        ],
        "GENERIC_ERROR": [
            Speech.generic_error_0_0_0
        ],
        "HELP": [
            Speech.generic_help_0_0_0
        ],
        "EXIT": [
            Speech.generic_exit_0_0_0
        ]
    }

    static randomMessage(type: string): string {
        return '<speak>' + _.sample(this.randomMessages[type])  + '</speak>';
    }

    static randomMessageFragment(type: string): string {
        return _.sample(this.randomMessages[type]);
    }
}