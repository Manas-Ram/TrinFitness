const db = require('./database');

class WellnessRequest {
    static getAll(callback) {
        db.all("SELECT * FROM wellness_requests", callback);
    }
}

module.exports = WellnessRequest;
