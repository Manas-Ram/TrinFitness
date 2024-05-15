exports.getLogin = (req, res) => {
    res.render('login', { username: req.query.username, errorMessage: req.query.error });
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    const success = true; // Authentication logic goes here
    if (success) {
        res.redirect('/calendar');
    } else {
        res.redirect(`/login?error=Invalid credentials&username=${encodeURIComponent(username)}`);
    }
};
