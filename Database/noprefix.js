const mongoose = require('mongoose')

const npSchema = new mongoose.Schema({
  ClientId: { type: String},
  noprefixids: { type: Array },
});

module.exports = new mongoose.model('Noisy No Prefix', npSchema)