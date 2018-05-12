const prompt = require('prompt');

module.exports = class {
  start() {
    prompt.start();
  }

  input() {
    return new Promise((resolve, reject) => {
      prompt.get('word', (err, result) => {
        if(err) return reject(err);

        resolve(result.word);
      });
    });
  } 

}
