const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});


describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Debería devolver una lista de nombres de usuario cuando hay usuarios en la base de datos', async () => {
    const response = await request(app).get('/getUsernames');
    expect(response.status).toBe(200);
    expect(response.body.usernames).toBeDefined();
    expect(response.body.usernames.length).toBeGreaterThan(0);
  });

  it('Debería actualizar las estadísticas del usuario correctamente', async () => {
    const username = 'testuser';
    const numRespuestasCorrectas = 5;
    const numRespuestasIncorrectas = 3;

    const response = await request(app)
      .get('/updateStats')
      .query({ username, numRespuestasCorrectas, numRespuestasIncorrectas });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Estadísticas actualizadas con éxito');

  });

  it('Debería devolver un mensaje de error cuando el usuario no se encuentra en la base de datos al actualizar estadisticas', async () => {
    const username = 'usuario_inexistente';
    const numRespuestasCorrectas = 5;
    const numRespuestasIncorrectas = 3;

    const response = await request(app)
      .get('/updateStats')
      .query({ username, numRespuestasCorrectas, numRespuestasIncorrectas });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Usuario no encontrado');
  });

  it('Debería devolver un mensaje de error cuando el usuario no se encuentra en la base de datos al obtener sus datos', async () => {
    const username = 'usuario_inexistente';

    const response = await request(app)
      .get('/getUserData')
      .query({ username });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Usuario no encontrado');
  });

 

}

);


