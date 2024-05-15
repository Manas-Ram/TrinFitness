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
