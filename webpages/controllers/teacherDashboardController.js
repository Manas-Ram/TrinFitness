const SlotRequest = require('../models/SlotRequest');
const WeeklyCalendar = require('../models/WeeklyCalendar');

exports.getTeacherDashboard = (req, res) => {
    SlotRequest.getAll((err, slotRequests) => {
        if (err) return res.status(500).send(err);

        WeeklyCalendar.getAll((err, weeklyCalendarRows) => {
            if (err) return res.status(500).send(err);

            const weeklyCalendar = weeklyCalendarRows.reduce((acc, row) => {
                if (!acc[row.week]) acc[row.week] = {};
                if (!acc[row.week][row.day]) acc[row.week][row.day] = {};
                acc[row.week][row.day][row.time] = row.status;
                return acc;
            }, {});

            const calendarArray = Object.keys(weeklyCalendar).map(week => ({
                name: week,
                days: Object.keys(weeklyCalendar[week]).map(day => ({
                    name: day,
                    timeSlots: Object.keys(weeklyCalendar[week][day]).map(time => ({
                        time: time,
                        status: weeklyCalendar[week][day][time] || "Open"
                    }))
                }))
            }));

            res.render('teacherdashboard', { slotRequests, weeklyCalendar: calendarArray });
        });
    });
};
