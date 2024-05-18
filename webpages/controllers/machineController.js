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
exports.getSquatRack = (req, res) => {
    res.render('machine', {
        exerciseName: 'Squat Rack',
        demonstratorName: 'Your Name',
        descriptionTips: ['Tip 1', 'Tip 2', 'Tip 3']
    });
};
exports.getDeadLift = (req, res) => {
    res.render('machine', {
        exerciseName: 'Deadlift',
        demonstratorName: 'Your Name',
        descriptionTips: ['Tip 1', 'Tip 2', 'Tip 3']
    });
};
