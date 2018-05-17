const prompt = require('prompt');

prompt.message = "";
prompt.delimiter = "";

module.exports = class {

  static confirm() {
    return new Promise((resolve) => {
      prompt.get({
        properties: {
          answer: {
            description: "Save to phrasebook? y/n"
          }
        }
      }, (err, result) => {
        if(err) return process.exit(0);

        resolve(result.answer === "y");
      });
    });
  }

  static input() {
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
