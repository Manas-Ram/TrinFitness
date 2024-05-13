const MenuOption = require('../models/menuOption');

exports.getAllMenuOptions = async (req, res) => {
  try {
    const rows = await MenuOption.fetchAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu options', error: err });
  }
};
