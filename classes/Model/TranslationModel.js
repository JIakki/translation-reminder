const day = 86400000;
const ratingMap = {
  0: 0,
  1: day,
  2: day * 7,
  3: day * 31,
  4: day* 90
}

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
  constructor({ word, translate, translationId, learnAfterTime, learned = false, rating = 0 }) {
    this.word = word;
    this.translate = translate;
    this.traslationId = translationId;
    this.learned = learned;
    this.learnAfterTime  = learnAfterTime;
    this.rating = rating;
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

  getLearnTime() {
    return this.learnAfterTime;
  }

  getRating() {
    return this.rating;
  }

  setTranslationId(translationId) {
    this.translationId = translationId;
  }

  setLearnStatus(status) {
    this.learned = status;
  }

  setLearnTime(time) {
    this.learnAfterTime = time;
  }

  incRating(value) {
    // do not descrease rating less than 0  
    if(value > 0 || this.rating) {
      this.rating += value;
    }
  }

  updateNextLearnTimeByRating() {
    const value = ratingMap[this.rating];

    if(!value) {
      return this.setLearnStatus(true);
    }

    this.setLearnTime(Date.now() + ratingMap[this.rating]);
  }
}
