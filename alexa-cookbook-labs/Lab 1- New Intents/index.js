// ref: https://github.com/alexa/alexa-cookbook
// anuja.nagare@uga.edu
// Node.js 6.10

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';

    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('MyIntent');
    },

    'MyIntent': function () {
        this.emit(':tell', 'Hello! welcome home Anuja! How was your day ?');
    },

    'WhatsUpIntent': function () {
        this.emit(':ask', 'Whats Up Anuja! How are you ?');
    },
    
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'you need some help?');
    },
    
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'GoodBye');
    },
    
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'GoodBye');
    }
};
