const db = require('./database');

class User {
    static getAdmin(callback) {
        db.get("SELECT * FROM users WHERE role = 'Admin'", callback);
    }
}

module.exports = User;
