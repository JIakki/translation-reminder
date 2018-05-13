const min = 60000;
const events = require('./events');

events.init();

// check now and every 15 min
events.checkTranslation()
setInterval(events.checkTranslation, 15 * min);
