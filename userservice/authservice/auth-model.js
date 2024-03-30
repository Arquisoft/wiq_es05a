const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
    correctAnswers:Number,
    incorrectAnswers: Number,
    completedGames: Number,
    averageTime: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User