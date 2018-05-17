const Mapper = require('./Base');

module.exports = class TranslationMapper extends Mapper {
  
  createTranslation(translation) {
    return this.db
      .push(translation)
      .write()
  }

  getTranslation(translation) {
    return this.db.find({ word: translation.word }).value();
  }

  getRandomTranslation() {
    const records = this.db
      .filter({ learned: false })
      .filter(e => Date.now() > e.learnAfterTime).value();
    
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

  migrate() {
    for(const e of this.db.value()) {
      this.db.find({ translationId: e.translationId }).assign({
        learnAfterTime: Date.now(), rating: 0
      }).write()
    }

  }
}
