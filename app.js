const events = require('./events');

const translate = require('google-translate-api');
const from = 'en';
const to = 'ru';

const notifier = require('node-notifier');
const prompt = require('prompt');
events.init(prompt);
return;


//
// Start the prompt
//
prompt.start();
waitWord();
//
// Get two properties from the user: username and email
//


function waitWord() {
  prompt.get(['word'], function (err, result) {
    
  });
}

return;
// String
notifier.notify({
  sound: true,
  message: "f",
  wait: true,
  actions: ['Ok', 'No'],
  closeLabel: "ex"

});


