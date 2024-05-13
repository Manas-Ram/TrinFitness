const db = require('../config/database');

class WellnessRequest {
  constructor(id, name, date) {
    this.id = id;
    this.name = name;
    this.date = date;
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM wellness_requests', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = WellnessRequest;
