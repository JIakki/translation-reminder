const chalk = require('chalk');
const boxen = require('boxen');

module.exports = new class Logger {
  success(text) {
    console.log(chalk.green(text))
  }

  boxed(text) {
    console.log(boxen(chalk.cyan(text), { padding: 1 }));
  }

}
