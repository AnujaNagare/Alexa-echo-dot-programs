/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 * orginally taken from cloud guru course work and updated code.
 * Author : Anuja Nagare (anuja.nagare@uga.edu) 22.7.2017
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Anuja for a Quote"
 *  Alexa: "Here's your Quote: ..."
 *  
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Quotes.
 */
var FACTS = [
   "When you don't give up, you cannot fail!",
    "Everything happens for a reason. Maybe you don't see the reason right now, but when it is finally revealed, it will blow you away!",
    "An arrow can only be shot by pulling it backward. So, when life is dragging you with difficulties, it means that it's going to launch you into something great !",
    "Do not store dreams in your eyes, they may roll down with tears, store them in your heart, each heart beat will inspire you to fulfill them",
    "shoot for the moon, even if you miss, you will land among the stars",
    "the only limits in life are the ones you make",
    "Never stop believing in hope, because miracles happen every day",
    "Life is short and temporary. don't stress just because you can't get what you want. learn to appreciate what you have !",
    "if it doesn't challenge you, it won't change you !",
    "Keep the faith. the most amazing things in life tend to happen right at the moment you are about to give up hope!",
    "Defeat is not declared when you fall down, it is declared when you refuse to get up !",
    "it is never too late to start over !, if you weren't happy with yesterday, try something different today !, don't stay stuck, do better",
    "When you feel like quitting, remember why you started !",
    "Life isn't about finding yourself, life is about creating yourself !",
    "Keep your head up! god gives his hardest battles to his strongest soldiers !",
    "you got a dream, you have to protect it !, when people can't do something themselves they will tell you that you can't do it ! you want something goes get it !",
    "Strength doesn't come from what you can do! it comes from overcoming the things you once thought you couldn't ",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful !",
    "It's never too late to become what you might have been !",
    "Someday everything will make perfect sense! so, for now, laugh at the confusion, smile through the tears, be strong and keep reminding yourself that everything happens for a reason!",
    "Nothing is permanent! don't stress yourself too much because no matter how bad the situation is it will change!",
    "the future belongs to those who believe in the beauty of their dreams",
    "when it feels scary to jump, that is exactly when you jump. otherwise, you end up staying in the same place your whole life and that i can not do",
    "whether you think you are ready or not just start right now! there is magic in action !",
    "if the path before you is clear, you are probably on someone else's! Do not go where the path may lead, go instead where there is no path and leave a trail!"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Quoteoftheday is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a quote, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Quote: " + randomFact;
    var cardTitle = "Your quote";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

