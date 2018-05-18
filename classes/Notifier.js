const notifier = require('node-notifier');

module.exports = class Notifier {

  static success() {
    notifier.notify({
      message: "Success"
    })
  }

  static message(message) {
    return new Promise((resolve, reject) => {
      notifier.notify({ message }, err => {
        if(err) return reject(err);

        return resolve();
      });
    })
  }

  static question(message) {
    return new Promise((resolve, reject) => {
      notifier.notify({ 
        sound: "Hero", 
        message: message, 
        wait: true, 
        reply: true,
        closeLabel: "I don't know.",
        timeout: 60,
      }, (err, response, meta) => {
        if(response === 'replied') {
          return resolve(meta.activationValue);
        }

        return reject(err);
      });
    });
  }

}


