// const slotRequestModel = require('../models/slotRequest');

// // Get all slot requests
// const getAllSlotRequests = async (req, res) => {
//     try {
//         const slotRequests = await slotRequestModel.getAllSlotRequests();
//         res.json(slotRequests);
//     } catch (err) {
//         res.status(500).json({ message: 'Error retrieving slot requests', error: err });
//     }
// };

// // Handle a new slot request
// const handleNewSlotRequest = async (req, res) => {
//     const { week, day, time, user } = req.body;
//     try {
//         const newRequest = await slotRequestModel.addSlotRequest(week, day, time, user);
//         res.json({ message: 'Slot request added successfully', newRequest });
//     } catch (err) {
//         res.status(400).json({ message: 'Error adding slot request', error: err });
//     }
// };

// // Update slot request status
// const updateSlotRequestStatus = async (req, res) => {
//     const { id, status } = req.body;
//     try {
//         const updatedRequest = await slotRequestModel.updateSlotRequestStatus(id, status);
//         res.json({ message: 'Slot request updated successfully', updatedRequest });
//     } catch (err) {
//         res.status(400).json({ message: 'Error updating slot request', error: err });
//     }
// };

// module.exports = {
//     getAllSlotRequests,
//     handleNewSlotRequest,
//     updateSlotRequestStatus,
// };

const SlotRequest = require('../models/slotRequest');

exports.getAllSlotRequests = async (req, res) => {
  try {
    const rows = await SlotRequest.fetchAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch slot requests', error: err });
  }
};

exports.updateSlotRequest = async (req, res) => {
  const { id, action } = req.body;
  const status = action === 'accept' ? 'accepted' : 'denied';

  try {
    const result = await SlotRequest.updateStatus(id, status);
    if (result > 0) {
      res.json({ success: true, message: `Request ${action}ed successfully.` });
    } else {
      res.status(404).json({ success: false, message: 'Request not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update slot request', error: err });
  }
};
