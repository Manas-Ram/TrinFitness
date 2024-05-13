const db = require('../config/database');

class User {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = User;
