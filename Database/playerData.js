const mongoose = require('mongoose')

const npSchema = new mongoose.Schema({
  id: { type: String },
  messageId: { type: String },
  messageChannel: { type: String }
});

module.exports = new mongoose.model('Player Data', npSchema)