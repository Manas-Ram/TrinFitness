const WeeklyCalendar = require('../models/WeeklyCalendar');

exports.getCalendar = (req, res) => {
    const currentWeek = 'February 26th - March 1st';
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weeks = ['February 26th - March 1st', 'March 4th - March 8th'];

    WeeklyCalendar.getByWeek(currentWeek, (err, rows) => {
        if (err) return res.status(500).send(err);

        const weeklyCalendar = weekDays.reduce((acc, day) => {
            acc[day] = rows.filter(row => row.day === day).reduce((dayAcc, row) => {
                dayAcc[row.time] = row.status;
                return dayAcc;
            }, {});
            return acc;
        }, {});

        res.render('calendar', { currentWeek, weekDays, weeks, weeklyCalendar });
    });
};
