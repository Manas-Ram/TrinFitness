// const db = require('../database');

// // Get all slot requests
// const getAllSlotRequests = async () => {
//     const query = 'SELECT * FROM slot_requests;';
//     const { rows } = await db.query(query);
//     return rows;
// };

// // Add a new slot request
// const addSlotRequest = async (week, day, time, user) => {
//     const query = 'INSERT INTO slot_requests (week, day, time, user_id) VALUES ($1, $2, $3, $4) RETURNING *;';
//     const { rows } = await db.query(query, [week, day, time, user]);
//     return rows[0];
// };

// // Update a slot request's status
// const updateSlotRequestStatus = async (id, status) => {
//     const query = 'UPDATE slot_requests SET status = $2 WHERE id = $1 RETURNING *;';
//     const { rows } = await db.query(query, [id, status]);
//     return rows[0];
// };

// module.exports = {
//     getAllSlotRequests,
//     addSlotRequest,
//     updateSlotRequestStatus,
// };

const db = require('../config/database');

class SlotRequest {
  constructor(id, week, day, time, user, status) {
    this.id = id;
    this.week = week;
    this.day = day;
    this.time = time;
    this.user = user;
    this.status = status;
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM slot_requests', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM slot_requests WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE slot_requests SET status = ? WHERE id = ?', [status, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = SlotRequest;

