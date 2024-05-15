const MenuOption = require('../models/MenuOption');

exports.getMenu = (req, res) => {
    MenuOption.getDistinctWeeks((err, weeks) => {
        if (err) return res.status(500).send(err);

        const weekNames = weeks.map(week => week.week);

        MenuOption.getAll((err, menuOptions) => {
            if (err) return res.status(500).send(err);

            res.render('menu', { weeks: weekNames, menuOptions });
        });
    });
};
exports.uploadMenu = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // Process the uploaded file (e.g., save file info to database, etc.)
    // Here you can add logic to read and parse the file if needed

    res.send('File uploaded successfully.');
};