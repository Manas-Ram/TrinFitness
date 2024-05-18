const db = require('./database');

class User {
    static findOrCreate({ email, role, isAdmin }, callback) {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
            if (err) {
                return callback(err);
            }
            if (user) {
                return callback(null, user);
            } else {
                db.run("INSERT INTO users (email, role, isAdmin) VALUES (?, ?, ?)", [email, role, isAdmin], function(err) {
                    if (err) {
                        return callback(err);
                    }
                    db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (err, newUser) => {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, newUser);
                    });
                });
            }
        });
    }

    static getAdmin(callback) {
        db.all("SELECT * FROM users WHERE isAdmin = 1", callback);
    }

    static getLoginData(callback) {
        db.all("SELECT email, MIN(timestamp) as firstLogin, COUNT(*) as loginCount FROM activities WHERE activity_type = 'login' GROUP BY email", (err, rows) => {
            if (err) {
                return callback(err);
            }
            const totalLogins = rows.reduce((acc, row) => acc + row.loginCount, 0);
            callback(null, { totalLogins, userLogins: rows });
        });
    }
    static getAllUsers(callback) {
        db.all("SELECT * FROM users", callback);
    }
}

module.exports = User;
