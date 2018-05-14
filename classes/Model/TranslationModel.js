module.exports = class TranslationModel {

  /**
   * constructor
   *
   * @name constructor
   * @function
   * @param word string
   * @param translate string
   * @param priority int
   * @param translationId string
   * @returns {undefined}
   */
  constructor({ word, translate, priority, translationId, learned = false }) {
    this.word = word;
    this.translate = translate;
    this.traslationId = translationId;
    this.priority = priority;
    this.learned = learned;
  }

  setTranslationId(translationId) {
    this.translationId = translationId;
  }

  getTranslationId() {
    return this.translationId;
  }

  getOrigin() {
    return this.word;
  }
  
  getTranslate() {
    return this.translate;
  }

  isLearned() {
    return this.learned;
  }

  setLearnStatus(status) {
    this.learned = status;
  }
}
