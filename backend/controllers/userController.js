const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const rows = await User.fetchAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err });
  }
};
