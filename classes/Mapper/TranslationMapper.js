const Mapper = require('./Base');

module.exports = class TranslationMapper extends Mapper {
  
  createTranslation(translation) {
    if(this.db.find({ word: translation.word }).value()) {
      return { updated: false };
    }

    this.db
      .push(translation)
      .write()

    return { updated: true }

  }

  getRandomTranslation() {
    const records = this.db.filter({ learned: false }).value();
    
    if(!records.length) return false;
    const index = Math.floor(Math.random() * records.length);

    return records[index];
  }

  updateTranslation(translation) {
    this.db
      .find({ word: translation.word })
      .assign(translation)
      .write()

  }
}
