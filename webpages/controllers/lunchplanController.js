const MenuOption = require('../models/MenuOption');

exports.getLunchplan = (req, res) => {
    MenuOption.getDistinctWeeks((err, weeks) => {
        if (err) return res.status(500).send(err);

        const weekNames = weeks.map(week => week.week);

        MenuOption.getAll((err, menuOptions) => {
            if (err) return res.status(500).send(err);

            res.render('lunchplan', {
                mealTypes: [
                    { value: 'no_restriction', display: 'No Restriction' },
                    { value: 'high_protein', display: 'High Protein' },
                    { value: 'high_fat', display: 'High Fat' }
                ],
                dietaryRestrictions: [
                    { id: 'none', name: 'none', value: 'None', label: 'No Restriction' },
                    { id: 'vegan', name: 'vegan', value: 'Vegan', label: 'Vegan' },
                    { id: 'vegetarian', name: 'vegetarian', value: 'Vegetarian', label: 'Vegetarian' }
                ],
                suggestions: [] // No suggestions initially
            });
        });
    });
};

exports.postLunchplan = (req, res) => {
    const { mealType, dietaryRestriction } = req.body;

    MenuOption.getAll((err, menuOptions) => {
        if (err) return res.status(500).send(err);

        const filteredOptions = menuOptions.filter(menuItem => {
            let meetsCriteria = true;

            if (mealType === 'high_protein' && parseInt(menuItem.protein) < 30) meetsCriteria = false;
            if (mealType === 'high_fat' && parseInt(menuItem.fat) < 15) meetsCriteria = false;
            if (dietaryRestriction !== 'none' && !menuItem.name.toLowerCase().includes(dietaryRestriction.toLowerCase())) {
                meetsCriteria = false;
            }

            return meetsCriteria;
        });

        res.render('lunchplan', {
            mealTypes: [
                { value: 'no_restriction', display: 'No Restriction' },
                { value: 'high_protein', display: 'High Protein' },
                { value: 'high_fat', display: 'High Fat' }
            ],
            dietaryRestrictions: [
                { id: 'none', name: 'none', value: 'None', label: 'No Restriction' },
                { id: 'vegan', name: 'vegan', value: 'Vegan', label: 'Vegan' },
                { id: 'vegetarian', name: 'vegetarian', value: 'Vegetarian', label: 'Vegetarian' }
            ],
            suggestions: filteredOptions
        });
    });
};
