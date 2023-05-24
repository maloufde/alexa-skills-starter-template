# Adonous Tech Alexa Skills Starter Template 

This template allows you to quickly create a TypeScript based Alexa skill with independent back end deployment and configuration. That is, you can deploy your serverless application that powers your skill separately from skill-specific resources such as the manifest and interaction model. This template does not use ASK CLI to deploy the lambda function, instead that is handled by custom commands.

## PreRequisites
* AWS Account https://aws.amazon.com/
* Amazon Developer Account https://developer.amazon.com/
* Latest version of Node https://nodejs.org/en/download/
* AWS CLI https://aws.amazon.com/cli/
* Initalized ASK CLI https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html
* ASK SDK https://ask-sdk-for-nodejs.readthedocs.io/en/latest/index.html


**For complete instructions on working with this template, see the
Udemy course Extreme Alexa Skills Development: Templatates and Back-End here: https://www.udemy.com/course/extreme-alexa-skills-development-templates-and-back-end/

**For non-Windows users substitute the stated command with command ending in _-unix_**

## Instructions
Clone this template to your system using the ASK CLI. Specifically, run the following command:

```
ask new --url https://github.com/AdonousTech/alexa-skills-starter-template.git
```

### Add package.json config values
Once you have the template in the desired directory on your system, you can update the config object in package.json with the requested values.

* CD into the lambda function
```
cd ./lambda/custom
```
Next, update the config object in the package.json file at the root of the lambda function directory. The properties with existing values are the defaults. If you change these values, be sure to update the corresponding objects in the file structure.
```
  "config": {
    "functionName": "",
    "functionFileName": "skill_lambda.zip",
    "functionFileLocation": "./skill_lambda",
    "functionFileLocationNormalized": "fileb://skill_lambda.zip",
    "region": "",
    "stackName": "",
    "template": "file://./skill-stack.json",
    "profile": ""
  },
```

Let's walk through each of these properties:
- **functionName**     The name of the lambda function from your AWS account. You will not have this value until you deploy the Cloudformation stack for the first time
- **functionFileName** The name of the file that makes up the actual lambda function. This file is recreated each time the skill is deployed. 
- **functionFileLocation** The path to the packaged lambda function.     
- **functionFileLocationNormalized** Allows us to pass in the contents of the lambda package zip file to the AWS CLI as a binary object. For more info see https://aws.amazon.com/blogs/developer/best-practices-for-local-file-parameters/  
- **region** The AWS region
- **stackName** The name of the resulting CloudFormation stack. Keep this name short, as resources will be created and prepended with this name. If the name is too long, you could run in to issues.  
- **template** The path to the template. This passes in the contents of the CloudformationTemplate as text. For more info see https://aws.amazon.com/blogs/developer/best-practices-for-local-file-parameters/  
- **profile** The AWS CLI profile you intend to use when making calls to various APIS 

### Create the Stack

After adding the config values, you are ready to create the Cloudformation Stack. Create the stack by running:
```
npm run create-skills-stack
```

**Non-Windows**
```
npm run create-skills-stack-unix
```

### Update Config Values

Once stack creation is complete, you can find your new lambda function and copy the name of the function. Paste the name of the function in your config file at the **functionName** parameter.

### Update skill.json manifest file

Next, open the **skill.json** file at the **root** of the project. Add your function name to the **apis.custom.endpoint.uri** property as specified below:
```
    "apis": {
      "custom": {
        "endpoint": {
          "sourceDir": "lambda/custom",
          "uri": "[ADD FUNCTION ARN HERE AS STRING]"
        }
      }
    },
```

Add the name of your skill, as well as the category. You can update the testing instructions 
and other values at a later time
```
    "name": "just-a-test",
    "description": "Sample Full Description"
```

```
    "isAvailableWorldwide": true,
    "testingInstructions": "Sample Testing Instructions.",
    "category": "[ADD CATEGORY FROM https://developer.amazon.com/docs/smapi/skill-manifest.html#category-enum]",
    "distributionCountries": []
```

While in the **skill.json** file, go ahead and update the category property to provide a value from
here https://developer.amazon.com/docs/smapi/skill-manifest.html#category-enum

This steps ensures that ASK CLI will deploy the lambda code to the function you set up earlier via CloudFormation. Using this template, ASK CLI will only attempt to deploy your function on the initial skill creation (See *Deploy Skill for the 1st time*). 

### Deploy the skill for the 1st time
Make sure you are in the root of the project. This will instruct the ASK CLI to create a new Alexa Skill in your developer account, and to associate and deploy the lambda function to your AWS back end.

```
ask deploy --target all
```

### Update the Config object in the root package.json
Next, you need to update the config object of the root package.json with the skill id. This is necessary for future skill deployments. It allows you to pull the skill manifest from the developer console before pushing an update. When creating the skill manifest, its a lot easier to add values in the developer console, than to make the updates by hand in the JSON file. On every deployment, the latest manifest is pulled in from the developer console,
before deploying the skill.

* Make a note of the skill id from **.ask/config**
Make sure you are in the **root** package.json. Add the skill id to the **skillId** property of the config object.
```
    "config": {
        "profile": "default",
        "skillId": "amzn1.ask.skill.xxxxxxxxxxxxxxxxxxxxx"
      },
```

### Update the existing Alexa Skill Kit Trigger for the Lambda Function
When you created the Cloudformation stack earlier, it included an AWS Lambda Permission that allows the Alexa Skill Skit to invoke the lambda function. However, this trigger did not include an EventSourceToken which is used as an additional layer of security on the trigger. In the context of an Alexa Skill, the EventSourceToken is the actual skill id. Associating this value with the trigger ensures that only the Alexa Skill with the specified ID can trigger the specific lambda function.

* Make a note of the skill id from **.ask/config**
```
      "skill_id": "amzn1.ask.skill.xxxxxxxxxxxxxxxxxxxxx",
      "was_cloned": false,
      "resources": {
        "manifest": {
          "eTag": "xxxxxxxxxxxxxx"
        },
```
* CD into the lambda function directory
```
cd ./lambda/custom
```
* Update the **AlexaSkillFunctionPermissions** resource in the **skill-stack.json** Cloudformation template by adding **EventSourceToken**  as a property, and the skill id as the value.
```
        "AlexaSkillFunctionPermissions": {
            "Type": "AWS::Lambda::Permission",
            "Properties": {
                "FunctionName": {
                    "Ref": "LambdaFunction"
                },
                "Action": "lambda:InvokeFunction",
                "Principal": "alexa-appkit.amazon.com",
                "EventSourceToken": "amzn1.ask.skill.xxxxxxxxxxx"
            }
        }
```
* Update the stack. Note, this change requires Cloudformation to **replace** the existing Alexa Skills Trigger. See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement
```
npm run update-skills-stack
```

**Non-Windows**
```
npm run update-skills-stack-unix
```

Check the progress of the stack update in your AWS account. If the update was successful, move to the next step .

### Install Dependencies Locally
While you are still in the root of the /lambda/custom directory. Install the necessary dependencies before building. Run:

```
npm install
```

### Compile the Typescript and Deploy the Skill
At this point, the skill is ready to deploy. When you first created the lambda function, it was created with boilerplate code that simply logs a message to the console. Next, we will use a custom command to deploy our entire skill. This will 1) deploy the interaction model to the ASK developer account; 2) deploy the skill manifest to the ASK developer account; 3) deploy any in-skill products to the ASK developer account; 4) Compile the typescript to JS for the lambda function; 5) create a packaged lambda function that will be accepted by the AWS Lambda service; and 6) deploy the function to AWS. **Make sure you are in the root of the project and run:**


```
npm run deploy-skill
```

**Non-Windows**
```
npm run deploy-skill-unix
```

Going forward, it is no longer necessary to use ``ask deploy`` command explcitly, to deploy the skill. Instead using the above command does the trick. 

### Next Steps
* Test your interaction model and skill in the developer console or at the command line






