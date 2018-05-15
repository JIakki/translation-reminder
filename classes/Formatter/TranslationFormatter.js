module.exports = class TranslationFormatter {
  constructor(translation) {
    this.translation = translation;
  }

  format() {
    return {
      translationId: this.translation.getTranslationId(),
      word: this.translation.getOrigin(),
      translate: this.translation.getTranslate(),
      learned: this.translation.isLearned(),
      learnAfterTime: this.translation.getLearnTime(),
      rating: this.translation.getRating()
    }
  }

}
