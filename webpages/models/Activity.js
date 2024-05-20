const db = require('./database');

class Activity {
    static logActivity(userEmail, activityType, callback) {
        db.run(
            "INSERT INTO activities (user_email, activity_type, timestamp) VALUES (?, ?, datetime('now'))",
            [userEmail, activityType],
            callback
        );
    }

    static getAllActivities(callback) {
        db.all("SELECT * FROM activities ORDER BY timestamp DESC", callback);
    }

    static getLoginCounts(callback) {
        db.all(
            "SELECT date(timestamp) as day, COUNT(*) as count FROM activities WHERE activity_type = 'login' GROUP BY day",
            callback
        );
    }
}

module.exports = Activity;

