const Controller = require('./Base');
const collection = "translations";

module.exports = class TranslationController extends Controller {

  translate(input) {
    const Translater = this.getService("Translater");
    const events = this.getService("events");
    const translater = new Translater();

    return translater.translate(input)
      .then(result => {
        return events.newTranslation(input, result)
      });
  }

  createTranslation(word, translate) {
    const db = this.getService("Database");
    const shortid = this.getService("shortid");
    const Logger = this.getService("Logger");
    const Prompt = this.getService("Prompt");

    const TranslationMapper = this.getService("TranslationMapper");
    const TranslationFormatter = this.getService("TranslationFormatter");
    const TranslationModel = this.getService("TranslationModel");

    const translation = new TranslationModel({ word, translate });
    const translationMapper = new TranslationMapper(db.connect(collection)) 
    translation.setTranslationId(shortid.generate());
    translation.setLearnTime(Date.now());

    const formatted = (new TranslationFormatter(translation)).format();

    if(translationMapper.getTranslation(formatted)) {
      Logger.starry(translate);
      return Promise.resolve();
    }

    Logger.boxed(translate);
    
    return Prompt.confirm()
      .then(agree => {
        if(!agree) return Promise.resolve();

        return translationMapper.createTranslation(formatted);
      });
  }

  checkTranslation() {
    const db = this.getService("Database");
    const notifier = this.getService("Notifier");

    const TranslationMapper = this.getService("TranslationMapper");
    const TranslationModel = this.getService("TranslationModel");
    const translationMapper = new TranslationMapper(db.connect(collection));

    const result = translationMapper.getRandomTranslation();

    if(!result) return notifier.message("Phrasebook is empty");

    const translation = new TranslationModel(result);

    return notifier.question(translation.getOrigin())
      .then(answer => {
        const isAnswerCorrect = translation.getTranslate() === answer;

        isAnswerCorrect ? translation.incRating(1) : translation.incRating(-1);

        translation.updateNextLearnTimeByRating();
        translationMapper.updateTranslation(translation);

        return isAnswerCorrect ? notifier.success() : Promise.reject();
      })
      .catch(() => notifier.message(`Wrong. Answer is ${ translation.getTranslate() }`));
  }
}
