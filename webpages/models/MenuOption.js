const db = require('./database');

class MenuOption {
    static getAll(callback) {
        db.all("SELECT * FROM menu_options", callback);
    }

    static getDistinctWeeks(callback) {
        db.all("SELECT DISTINCT week FROM menu_options", callback);
    }
}

module.exports = MenuOption;
