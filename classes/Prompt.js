const prompt = require('prompt');

module.exports = class {
  start() {
    prompt.start();
  }

  input() {
    return new Promise((resolve) => {
      prompt.get('word', (err, result) => {
        if(err) return process.exit(0);

        resolve(result.word);
      });
    });
  } 

}
