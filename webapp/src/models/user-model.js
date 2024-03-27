const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    correctAnswers: {
      type: Number,
      default: 0, 
    },
    incorrectAnswers: {
      type: Number,
      default: 0, 
    },
    completedGames: {
      type: Number,
      default: 0, 
    },
    averageTime: {
      type: Number,
      default: 0, 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User