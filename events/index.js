const shortid = require('shortid');
const { TranslationController } = require('../controllers');
const { Prompt, Translater, Logger, Database, Notifier } = require('../classes'); 
const { TranslationModel } = require('../classes/Model')
const { TranslationMapper } = require('../classes/Mapper')
const { TranslationFormatter } = require('../classes/Formatter')

const prompt = new Prompt();

module.exports = new class {
  init() {
    this.input();
  }

  input() {
    const ctrl = new TranslationController();
    ctrl.service("Translater", Translater);
    ctrl.service("events", this);

    return prompt.input()
      .then(word => ctrl.translate(word))
      .catch(Logger.error)
  }

  newTranslation(word, translate) {
    const ctrl = new TranslationController();
    ctrl.service("Database", Database);
    ctrl.service("TranslationMapper", TranslationMapper);
    ctrl.service("TranslationFormatter", TranslationFormatter);
    ctrl.service("TranslationModel", TranslationModel);
    ctrl.service("shortid", shortid);
    ctrl.service("Logger", Logger);
    
    return ctrl.createTranslation(word, translate)
      .catch(Logger.error)
  }

  checkTranslation() {
    const ctrl = new TranslationController();

    ctrl.service("Database", Database);
    ctrl.service("Notifier", Notifier);
    ctrl.service("TranslationMapper", TranslationMapper);
    ctrl.service("TranslationModel", TranslationModel);

    return ctrl.checkTranslation() 
      .catch(Logger.error)
  }
}
