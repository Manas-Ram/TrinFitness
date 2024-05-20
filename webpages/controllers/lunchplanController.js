const MenuOption = require('../models/MenuOption');
const Activity = require('../models/Activity')
exports.getLunchplan = (req, res) => {
    MenuOption.getAll((err, menuOptions) => {
        if (err) return res.status(500).send(err);

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const weeklyMacros = days.reduce((totals, day) => {
            const dailyOptions = menuOptions.filter(option => option.day === day);
            dailyOptions.forEach(option => {
                totals.calories += parseInt(option.calories);
                totals.protein += parseInt(option.protein);
                totals.carbs += parseInt(option.carbs);
                totals.fat += parseInt(option.fat);
            });
            return totals;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

        res.render('lunchplan', {
            mealTypes: [
                { value: 'no_restriction', display: 'No Restriction' },
                { value: 'high_protein', display: 'High Protein' },
                { value: 'high_fat', display: 'High Fat' }
            ],
            dietaryRestrictions: [
                { id: 'none', name: 'none', value: 'none', label: 'No Restriction' },
                { id: 'vegan', name: 'vegan', value: 'vegan', label: 'Vegan' },
                { id: 'vegetarian', name: 'vegetarian', value: 'vegetarian', label: 'Vegetarian' }
            ],
            suggestions: menuOptions,
            menuOptions: menuOptions,
            weeklyMacros: weeklyMacros
        });
    });
};

exports.postLunchplan = (req, res) => {
    const { mealType, dietaryRestriction } = req.body;

    MenuOption.getAll((err, menuOptions) => {
        if (err) return res.status(500).send(err);

        const filteredOptions = menuOptions.filter(menuItem => {
            let meetsCriteria = true;

            if (mealType === 'high_protein' && parseInt(menuItem.protein) < 20) meetsCriteria = false;
            if (mealType === 'high_fat' && parseInt(menuItem.fat) < 20) meetsCriteria = false;
            if (dietaryRestriction !== 'none' && !menuItem.dietary.toLowerCase().includes(dietaryRestriction.toLowerCase())) {
                meetsCriteria = false;
            }

            return meetsCriteria;
        });

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        // const weeklyMacros = days.reduce((totals, day) => {
        //     const dailyOptions = filteredOptions.filter(option => option.day === day);
        //     dailyOptions.forEach(option => {
        //         totals.calories += parseInt(option.calories);
        //         totals.protein += parseInt(option.protein);
        //         totals.carbs += parseInt(option.carbs);
        //         totals.fat += parseInt(option.fat);
        //     });
        //     return totals;
        // }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
        Activity.logActivity(req.user.email, 'Applied Filters on Lunch Plan', (err) => {
            if (err) console.error('Failed to log activity:', err);
            res.render('lunchplan', {
                mealTypes: [
                    { value: 'no_restriction', display: 'No Restriction' },
                    { value: 'high_protein', display: 'High Protein' },
                    { value: 'high_fat', display: 'High Fat' }
                ],
                dietaryRestrictions: [
                    { id: 'none', name: 'none', value: 'none', label: 'No Restriction' },
                    { id: 'vegan', name: 'vegan', value: 'vegan', label: 'Vegan' },
                    { id: 'vegetarian', name: 'vegetarian', value: 'vegetarian', label: 'Vegetarian' }
                ],
                suggestions: filteredOptions,
                menuOptions: menuOptions
                // weeklyMacros: weeklyMacros
            });
        });
    });
};
