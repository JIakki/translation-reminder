const { Prompt } = require('./classes'); 
const events = require('./events');
require('dotenv').config();

const min = 60000;

// check now and every 15 min
events.checkTranslation()
setInterval(events.checkTranslation, process.env.HEARTBEAT * min);

// initial input event
(function input() {
  Prompt.input()
    .then(word => events.input(word))
    .then(() => input())
})();

