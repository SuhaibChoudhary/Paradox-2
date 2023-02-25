const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    id: { type: String },
    joined: { type: String },
    badges: { type: Array },
});

module.exports = new mongoose.model('User Data For Noisy', userSchema)