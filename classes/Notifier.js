const notifier = require('node-notifier');

module.exports = class Notifier {

  static success() {
    notifier.notify({
      message: "Success"
    })
  }

  static message(message) {
    notifier.notify({ message });
    return Promise.resolve();
  }

  static question(message) {
    return new Promise((resolve, reject) => {
      notifier.notify({ 
        sound: true, 
        message: message, 
        wait: true, 
        reply: true,
        timeout: 60,
      }, (err, response, meta) => {
        if(response === 'replied') {
          return resolve(meta.activationValue);
        }

        return reject();
      });
    });
  }

}


