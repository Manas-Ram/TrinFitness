exports.getBenchPress = (req, res) => {
    res.render('machine', {
        exerciseName: 'Bench Press',
        demonstratorName: 'Manas Ramesh',
        descriptionTips: [
            'This exercise strengthens triceps, pectorals, and delts',
            'Keep your chest up',
            'Tightly grip the bar with equal spacing'
        ]
    });
};
