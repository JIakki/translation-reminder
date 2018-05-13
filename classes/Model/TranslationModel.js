module.exports = class TranslationModel {

  constructor(word, translate) {
    this.word = word;
    this.translate = translate;
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
}
