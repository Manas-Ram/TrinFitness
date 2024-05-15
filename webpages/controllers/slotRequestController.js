const SlotRequest = require('../models/SlotRequest');
const WeeklyCalendar = require('../models/WeeklyCalendar');

exports.requestSlot = (req, res) => {
    const { week, day, time, user } = req.body;

    WeeklyCalendar.getByWeekAndDayAndTime(week, day, time, (err, slot) => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to request slot' });

        if (slot && slot.status !== 'Open') {
            return res.status(400).json({ success: false, message: 'Slot is not available' });
        }

        SlotRequest.create({ week, day, time, user }, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Failed to request slot' });
            }

            WeeklyCalendar.updateStatus(week, day, time, 'requested', (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Failed to update calendar' });
                }

                res.json({ success: true, message: 'Slot requested successfully' });
            });
        });
    });
};

exports.acceptRequest = (req, res) => {
    const { id } = req.body;

    SlotRequest.updateStatus(id, 'accepted', (err, request) => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to accept slot request' });

        WeeklyCalendar.updateStatus(request.week, request.day, request.time, 'accepted', (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Failed to update calendar' });
            }

            res.json({ success: true, message: 'Slot request accepted successfully' });
        });
    });
};

exports.denyRequest = (req, res) => {
    const { id } = req.body;
    console.log(`Denying request with ID: ${id}`);  // Add this line to log the request

    SlotRequest.updateStatus(id, 'denied', (err, request) => {
        if (err) {
            console.error(`Failed to deny slot request: ${err}`);  // Add this line to log the error
            return res.status(500).json({ success: false, message: 'Failed to deny slot request' });
        }
        
        console.log(`Slot request denied for week: ${request.week}, day: ${request.day}, time: ${request.time}`);  // Add this line to log the request details
        
        WeeklyCalendar.updateStatus(request.week, request.day, request.time, 'denied', (err) => {
            if (err) {
                console.error(`Failed to update calendar: ${err}`);  // Add this line to log the error
                return res.status(500).json({ success: false, message: 'Failed to update calendar' });
            }

            console.log('Calendar updated to denied');  // Add this line to log the calendar update
            res.json({ success: true, message: 'Slot request denied successfully' });
        });
    });
};