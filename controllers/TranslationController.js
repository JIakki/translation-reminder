const Controller = require('./Base');

module.exports = class TranslationController extends Controller {
  translate(input) {
    const Translater = this.getService("Translater");
    const Logger = this.getService("Logger");
    const events = this.getService("events");
    const translater = new Translater("en", "ru");

    translater.translate(input)
      .then(result => {
        Logger.boxed(result);
        events.newTranslation(input, result);
        events.input();
      });
  }

  createTranslation(word, translate) {
    const db = this.getService("Database");
    const shortid = this.getService("shortid");

    const TranslationMapper = this.getService("TranslationMapper");
    const TranslationFormatter = this.getService("TranslationFormatter");
    const TranslationModel = this.getService("TranslationModel");
    const translation = new TranslationModel(word, translate);

    translation.setTranslationId(shortid.generate());

    const formatted = (new TranslationFormatter(translation)).format();

    new TranslationMapper(db.connect("translations")).createTranslation(formatted);
  }
}
