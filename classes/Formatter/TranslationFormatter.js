module.exports = class TranslationFormatter {
  constructor(translation) {
    this.translation = translation;
  }

  format() {
    return {
      translationId: this.translation.getTranslationId(),
      origin: this.translation.getOrigin(),
      translation: this.translation.getTranslate()
    }
  }

}
