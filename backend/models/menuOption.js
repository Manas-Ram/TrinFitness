const db = require('../config/database');

class MenuOption {
  constructor(id, name, calories, protein, carbs, fat) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM menu_options', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = MenuOption;
