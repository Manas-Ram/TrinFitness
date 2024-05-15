const db = require('./database');

class SlotRequest {
    static create({ week, day, time, user }, callback) {
        db.run("INSERT INTO slot_requests (week, day, time, user, status) VALUES (?, ?, ?, ?, 'requested')", [week, day, time, user], callback);
    }

    static getAll(callback) {
        db.all("SELECT * FROM slot_requests", callback);
    }

    static updateStatus(id, status, callback) {
        db.run("UPDATE slot_requests SET status = ? WHERE id = ?", [status, id], (err) => {
            if (err) return callback(err);
            db.get("SELECT * FROM slot_requests WHERE id = ?", [id], callback);
        });
    }
}

module.exports = SlotRequest;
