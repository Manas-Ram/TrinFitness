const WellnessRequest = require('../models/wellnessRequest');

exports.getAllWellnessRequests = async (req, res) => {
  try {
    const rows = await WellnessRequest.fetchAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wellness requests', error: err });
  }
};
