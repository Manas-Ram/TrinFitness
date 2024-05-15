const db = require('./database');

class WeeklyCalendar {
    static getByWeek(week, callback) {
        db.all("SELECT * FROM weekly_calendar WHERE week = ?", [week], callback);
    }

    static getByWeekAndDayAndTime(week, day, time, callback) {
        db.get("SELECT * FROM weekly_calendar WHERE week = ? AND day = ? AND time = ?", [week, day, time], callback);
    }

    static updateStatus(week, day, time, status, callback) {
        db.run("UPDATE weekly_calendar SET status = ? WHERE week = ? AND day = ? AND time = ?", [status, week, day, time], callback);
    }

    static getAll(callback) {
        db.all("SELECT * FROM weekly_calendar", callback);
    }
}

module.exports = WeeklyCalendar;
