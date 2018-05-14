const Controller = require('./Base');
const collection = "translations";

module.exports = class TranslationController extends Controller {

  translate(input) {
    const Translater = this.getService("Translater");
    const events = this.getService("events");
    const translater = new Translater();

    return translater.translate(input)
      .then(result => {
        events.newTranslation(input, result)
          .then(() => events.input());
      });
  }

  createTranslation(word, translate) {
    const db = this.getService("Database");
    const shortid = this.getService("shortid");
    const Logger = this.getService("Logger");

    const TranslationMapper = this.getService("TranslationMapper");
    const TranslationFormatter = this.getService("TranslationFormatter");
    const TranslationModel = this.getService("TranslationModel");
    const translation = new TranslationModel({ word, translate });

    translation.setTranslationId(shortid.generate());

    const formatted = (new TranslationFormatter(translation)).format();
    const result = new TranslationMapper(db.connect(collection)).createTranslation(formatted);

    result.updated ? Logger.boxed(translate) : Logger.starry(translate);

    return Promise.resolve();
  }

  checkTranslation() {
    const db = this.getService("Database");
    const notifier = this.getService("Notifier");

    const TranslationMapper = this.getService("TranslationMapper");
    const TranslationModel = this.getService("TranslationModel");

    const result = new TranslationMapper(db.connect(collection)).getRandomTranslation();

    if(!result) return notifier.message("Phrasebook is empty");

    const translation = new TranslationModel(result);

    return notifier.question(translation.getOrigin())
      .then(answer => {
        if(answer === translation.getTranslate().toLowerCase()) return notifier.success();

        return Promise.reject();
      })
      .catch(() => {
        return notifier.message(`Wrong. Answer is ${ translation.getTranslate() }`)
      });
  }
}
