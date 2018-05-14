const prompt = require('prompt');

prompt.message = "";
prompt.delimiter = "";

module.exports = class {
  start() {
    prompt.start();
  }

  input() {
    return new Promise((resolve) => {
      prompt.get({
        properties: {
          word: {
            description: "Enter a word:"
          }
        }
      }, (err, result) => {
        if(err) return process.exit(0);

        resolve(result.word);
      });
    });
  } 

}
