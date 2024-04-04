const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const statServiceUrl = process.env.STAT_SERVICE_URL || 'http://localhost:8004';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/pregunta', async (req, res) => {
  try{
    const questionResponse = await axios.get(questionServiceUrl+'/pregunta')
    res.json(questionResponse.data);
  }catch(error){
    res.status(error.response.status).json({error: error.response.data.error});
  }
});

app.get('/updateCorrectAnswers', async (req, res) => {
  console.log(req.query)
  const params = {username: req.query.username, numAnswers: req.query.numAnswers};
  //const { username } = req.query;
  try{
    const updateStatsResponse = await axios.get(userServiceUrl+ `/updateCorrectAnswers?params=${params}`)
    res.json(updateStatsResponse.data);
  }catch(error){
    res.status(error.response.status).json({error: error.response.data.error});
  }
});

app.get('/updateIncorrectAnswers', async (req, res) => {
  console.log(req.query)
  //const { username } = req.query;
  const params = {username: req.query.username, numAnswers: req.query.numAnswers};
  try{
    const updateStatsResponse = await axios.get(userServiceUrl+ `/updateIncorrectAnswers?params=${params}`)
    res.json(updateStatsResponse.data);
  }catch(error){
    res.status(error.response.status).json({error: error.response.data.error});
  }
});

app.get('/updateCompletedGames', async (req, res) => {
  console.log(req.query)
  const { username } = req.query;
  try{
    const updateStatsResponse = await axios.get(userServiceUrl+ `/updateCompletedGames?username=${username}`)
    res.json(updateStatsResponse.data);
  }catch(error){
    res.status(error.response.status).json({error: error.response.data.error});
  }
});



app.get('/getUserData', async (req, res) => {
  console.log(req.query)
  const { username } = req.query;
  try{
    const getUserDataResponse = await axios.get(userServiceUrl+ `/getUserData?username=${username}`)
    res.json(getUserDataResponse.data);
  }catch(error){
    res.status(error.response.status).json({error: error.response.data.error});
  }
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
