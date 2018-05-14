const chalk = require('chalk');
const boxen = require('boxen');

module.exports = new class Logger {
  success(text) {
    console.log(chalk.green(text))
  }

  boxed(text) {
    console.log(boxen(chalk.cyan(text), { padding: 1 }));
  }

  starry(text) {
    const starryText = `${ chalk.cyan(text) } ${ chalk.yellow('★') }`;
    console.log(boxen(starryText, { padding: 1 }));
  }

  error(text) {
    console.error(text)
  }

}
