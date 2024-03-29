// user-service.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model');

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
//const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri);

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password']);

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

app.get('/updateCorrectAnswers', async (req,res) => {
  console.log(req.query)
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    // Incrementa las respuestas correctas del usuario
    user.correctAnswers += 1;
    await user.save();
    return res.status(200).json({ success: true, message: 'Respuesta correcta actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la respuesta correcta:', error);
    return res.status(500).json({ success: false, message: 'Error al actualizar la respuesta correcta' });
  }
})

app.get('/updateIncorrectAnswers', async (req,res) => {
  console.log(req.query)
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    // Incrementa las respuestas correctas del usuario
    user.incorrectAnswers += 1;
    await user.save();
    return res.status(200).json({ success: true, message: 'Respuesta incorrecta actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la respuesta correcta:', error);
    return res.status(500).json({ success: false, message: 'Error al actualizar la respuesta incorrecta' });
  }
})
const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

app.get('/getUserData', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error al obtener los datos de usuario:', error);
    return res.status(500).json({ success: false, message: 'Error al obtener los datos de usuario' });
  }
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server