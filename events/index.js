const shortid = require('shortid');
const { TranslationController } = require('../controllers');
const { Prompt, Translater, Logger, Database } = require('../classes'); 
const { TranslationModel } = require('../classes/Model')
const { TranslationMapper } = require('../classes/Mapper')
const { TranslationFormatter } = require('../classes/Formatter')

const prompt = new Prompt();

module.exports = {
  init() {
    this.input();
  },

  input() {
    const ctrl = new TranslationController();
    ctrl.service("Translater", Translater);
    ctrl.service("Logger", Logger);
    ctrl.service("events", this);

    
    prompt.input()
      .then(word => ctrl.translate(word))
  },

  newTranslation(word, translate) {
    const ctrl = new TranslationController();
    ctrl.service("Database", Database);
    ctrl.service("TranslationMapper", TranslationMapper);
    ctrl.service("TranslationFormatter", TranslationFormatter);
    ctrl.service("TranslationModel", TranslationModel);
    ctrl.service("shortid", shortid);
    
    ctrl.createTranslation(word, translate)
  }
}
