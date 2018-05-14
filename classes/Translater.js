const translate = require('google-translate-api');

module.exports = class Translater {
  constructor(from, to) {
    this.from = from || process.env.FROM_LANG;
    this.to = to || process.env.TO_LANG;
  }

  translate(data) {
    const from = this.form;
    const to = this.to;

    return translate(data, { from, to })
      .then(res => res.text)
  }

}
