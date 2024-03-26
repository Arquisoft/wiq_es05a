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
      type: int,
      default: 0, 
    },
    incorrectAnswers: {
      type: int,
      default: 0, 
    },
    completedGames: {
      type: int,
      default: 0, 
    },
    averageTime: {
      type: int,
      default: 0, 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User