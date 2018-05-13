const Mapper = require('./Base');

module.exports = class TranslationMapper extends Mapper {
  
  createTranslation(translation) {
    return this.db
      .push(translation)
      .write()

  }
}
