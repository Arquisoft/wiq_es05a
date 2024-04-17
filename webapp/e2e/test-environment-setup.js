const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoserver;
let userservice;
let authservice;
let gatewayservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();
    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    userservice = await require("../../userservice/userservice/user-service");
    authservice = await require("../../userservice/authservice/auth-service");
    gatewayservice = await require("../../gatewayservice/gateway-service");
  }

  startServer();
