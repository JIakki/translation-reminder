module.exports = function (input) {
  const Translater = this.getService("Translater");
  const Logger = this.getService("Logger");
  const events = this.getService("events");
  const translater = new Translater("en", "ru");

  translater.translate(input)
    .then(result => {
      Logger.boxed(result)
      events.input();
    });
}
