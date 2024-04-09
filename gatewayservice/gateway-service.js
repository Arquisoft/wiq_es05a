const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

//librerias para OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs");
const YAML = require('yaml');

const app = express();
const port = 8000;

const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';

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
  const isValidUser = validateCredentials(req.body.username, req.body.password);

  if (!isValidUser) {
    // Si las credenciales son inválidas, devuelve un error 401
    res.status(401).json({ error: 'Credenciales incorrectas' });
    return; // Termina la ejecución de la función para evitar ejecutar el código restante
  }

  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

function validateCredentials(username, password) {
  // Verifica si la contraseña es erronea
  const invalidPassword = 'no'; 

  return !(password === invalidPassword);
}

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
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error });
    } else {
      // Manejo de otros errores como el caso de no tener respuesta
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
});

app.get('/updateStats', async (req, res) => {
  //const params = {username: req.query.username, numAnswers: req.query.numAnswers};
  const { username, numRespuestasCorrectas, numRespuestasIncorrectas} = req.query;
  console.log("username: "+username);
  console.log("correctas: "+numRespuestasCorrectas);
  console.log("incorrectas: "+numRespuestasIncorrectas);
  try{  
    const updateStatsResponse = await axios.get(userServiceUrl+ `/updateStats?username=${username}&numRespuestasCorrectas=${numRespuestasCorrectas}&numRespuestasIncorrectas=${numRespuestasIncorrectas}`)
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

// Read the OpenAPI YAML file synchronously
let openapiPath='./openapi.yaml';
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.")
}

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
