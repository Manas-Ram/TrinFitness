const db = require('./database');

class User {
    static findOrCreate({ email, isAdmin }) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) return reject(err);
                if (row) return resolve(row);
                db.run('INSERT INTO users (email, isAdmin) VALUES (?, ?)', [email, isAdmin ? 1 : 0], function(err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, email, isAdmin });
                });
            });
        });
    }

    static getAdmin(callback) {
        db.get("SELECT * FROM users WHERE isAdmin = 1", callback);
    }
}

module.exports = User;
