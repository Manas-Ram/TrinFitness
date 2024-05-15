// exports.getLogin = (req, res) => {
//     res.render('login', { username: req.query.username, errorMessage: req.query.error });
// };

// exports.postLogin = (req, res) => {
//     const { username, password } = req.body;
//     const success = true;
//     if (success) {
//         res.redirect('/calendar');
//     } else {
//         res.redirect(`/login?error=Invalid credentials&username=${encodeURIComponent(username)}`);
//     }
// };
exports.getLogin = (req, res) => {
    res.render('login', { username: req.query.username, errorMessage: req.query.error });
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    const success = true;
    if (success) {
        res.redirect('/calendar');
    } else {
        res.redirect(`/login?error=Invalid credentials&username=${encodeURIComponent(username)}`);
    }
};

exports.getProfile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/google');
    }
    res.render('calendar', { user: req.user });
};
