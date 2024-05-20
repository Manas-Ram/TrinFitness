const Activity = require('../models/Activity')
exports.getDemos = (req, res) => {
    Activity.logActivity(req.user.email, 'Clicked Demos', (err) => {
        if (err) console.error('Failed to log activity:', err);
        res.render('demos', { message: null, filePath: null });
    } )
        
};
