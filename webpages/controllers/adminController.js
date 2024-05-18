const User = require('../models/User');
const WellnessRequest = require('../models/WellnessRequest');
const WeeklyCalendar = require('../models/WeeklyCalendar');
const SlotRequest = require('../models/SlotRequest');
const Activity = require('../models/Activity');

exports.getAdminStatus = (req, res) => {
    User.getAdmin((err, loggedInUser) => {
        if (err) return res.status(500).send(err);

        WellnessRequest.getAll((err, wellnessRequests) => {
            if (err) return res.status(500).send(err);

            WeeklyCalendar.getByWeek('February 26th - March 1st', (err, weeklyCalendarRows) => {
                if (err) return res.status(500).send(err);

                const weeklyCalendar = weeklyCalendarRows.reduce((acc, row) => {
                    if (!acc[row.day]) acc[row.day] = {};
                    acc[row.day][row.time] = row.status;
                    return acc;
                }, {});

                SlotRequest.getAll((err, slotRequests) => {
                    if (err) return res.status(500).send(err);

                    Activity.getAllActivities((err, activities) => {
                        if (err) return res.status(500).send(err);

                        Activity.getLoginCounts((err, loginData) => {
                            if (err) return res.status(500).send(err);

                            res.render('adminstatus', {
                                loggedInUser: req.user,
                                wellnessRequests,
                                weeklyCalendar,
                                slotRequests,
                                activities,
                                loginData
                            });
                        });
                    });
                });
            });
        });
    });
};
