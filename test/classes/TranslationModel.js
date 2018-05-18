const TranslationModel = require('../../classes/Model/TranslationModel');

describe('Models', () => {
  describe('TranslationModel', () => {

    const translationModel = new TranslationModel({
      word: "day",
      translate: "день"
    });

    translationModel.setTranslationId(1);

    if('init TranslationModel', () => {
      translationModel.isLearned().should.be.False();
      translationModel.getRating().should.be.eql(0);
      translationModel.getTranslationId().should.be.eql(1)
    })

    it('getLearnTime should return current time', () => {
      translationModel.updateNextLearnTimeByRating();

      translationModel.getLearnTime().should.be.eql(Date.now())
    })

    it('incRating should correct increase', () => {
      translationModel.getRating().should.be.eql(0);
      translationModel.incRating(1)
      translationModel.getRating().should.be.eql(1);
      translationModel.incRating(1)
      translationModel.getRating().should.be.eql(2);
      translationModel.incRating(-2)
      translationModel.getRating().should.be.eql(0);
      translationModel.incRating(-2)
      translationModel.getRating().should.be.eql(0);
    })

    it('updateNextLearnTimeByRating should set translation as learned when rating is out of ratingMap', () => {

      translationModel.incRating(5)

      translationModel.updateNextLearnTimeByRating();
      translationModel.isLearned().should.be.True();

    })

  });
})
