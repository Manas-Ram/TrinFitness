const fs = require('fs');
const path = require('path');
const MenuOption = require('../models/MenuOption'); 

exports.getMenu = (req, res) => {
    MenuOption.getDistinctWeeks((err, weeks) => {
        if (err) return res.status(500).send(err);

        const weekNames = weeks.map(week => week.week);

        MenuOption.getAll((err, menuOptions) => {
            if (err) return res.status(500).send(err);

            res.render('menu', { weeks: weekNames, menuOptions, uploadedFile: null, fileType: null });
        });
    });
};

exports.uploadMenu = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, '../uploads', file.filename);
    const fileType = file.mimetype.split('/')[0];

    MenuOption.getDistinctWeeks((err, weeks) => {
        if (err) return res.status(500).send(err);

        const weekNames = weeks.map(week => week.week);

        MenuOption.getAll((err, menuOptions) => {
            if (err) return res.status(500).send(err);

            if (fileType === 'text') {

                fs.readFile(filePath, 'utf8', (err, fileContent) => {
                    if (err) {
                        return res.status(500).send('Failed to read file.');
                    }
                    res.render('menu', { weeks: weekNames, menuOptions, uploadedFile: fileContent, fileType });
                });
            } else if (fileType === 'image') {

                res.render('menu', { weeks: weekNames, menuOptions, uploadedFile: file.filename, fileType });
            } else {

                return res.status(400).send('Unsupported file type.');
            }
        });
    });
};
