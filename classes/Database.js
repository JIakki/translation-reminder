const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ translations: [] }).write();

module.exports = class Database {
  static connect(collection) {
    return db.get(collection);
  }
}
