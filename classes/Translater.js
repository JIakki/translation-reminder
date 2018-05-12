const translate = require('google-translate-api');

module.exports = class Translater {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  translate(data) {
    const from = this.form;
    const to = this.to;

    return translate(data, { from, to })
      .then(res => res.text)
  }

}
