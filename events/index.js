const Controllers = require('../controllers');
const { Prompt, Translater, Logger } = require('../classes'); 

const prompt = new Prompt();

module.exports = {
  init() {
    this.input();
  },

  input() {
    const ctrl = new Controllers('translate');
    ctrl.service("Translater", Translater);
    ctrl.service("Logger", Logger);
    ctrl.service("events", this);

    
    prompt.input()
      .then(word => ctrl.exec(word))
  }
}
