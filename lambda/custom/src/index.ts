import { SkillBuilders } from "ask-sdk";
import { LambdaHandler } from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";

import { LaunchRequestHandler } from "./lib/LaunchRequestHandler";
import { AmazonCancelIntentHandler } from "./lib/AMAZON_CancelIntent_Handler";
import { AmazonStopIntentHandler } from "./lib/AMAZON_StopIntent_Handler";
import { HelloHandler } from "./lib/HelloHandler";
import { SessionEndedHandler } from "./lib/SessionEndedHandler";
import { CustomErrorHandler } from "./lib/CustomErrorHandler";
import { AmazonFallbackIntentHandler } from "./lib/AMAZON_FallbackIntent_Handler";
import { GlobalRequestInterceptor } from './lib/GlobalRequestInterceptor';
import { GlobalResponseInterceptor } from './lib/GlobalResponseInterceptor';

const dbTable: string = process.env['dbtable'] || "";

function buildLambdaSkill(): LambdaHandler {
    return SkillBuilders.standard()
    .withTableName(dbTable)
    .addRequestHandlers(
        new AmazonCancelIntentHandler(),
        new AmazonStopIntentHandler(),
        new HelloHandler(),
        new LaunchRequestHandler(),
        new SessionEndedHandler(),
        new AmazonFallbackIntentHandler()
    )
    .addErrorHandlers(new CustomErrorHandler())
    .addRequestInterceptors(new GlobalRequestInterceptor())
    .addResponseInterceptors(new GlobalResponseInterceptor())
    .lambda();
 }

 // Lambda handler - entry point for skill
 export let handler = buildLambdaSkill();