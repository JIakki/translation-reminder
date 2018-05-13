module.exports = class TranslationModel {

  constructor(obj) {
    Object.assign(this, obj);
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
