const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

// Importamos Locust para realizar pruebas de rendimiento
const { spawn } = require('child_process');
const mockResponse = { data: { respuesta: 'Respuesta de Error' } };

afterAll(async () => {
  app.close();
});

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    }
  });

  // Test /login endpoint
  it('deberia iniciar sesión correctamente', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Prueba de manejo de errores para el endpoint /login
  it('deberia devolver error al iniciar sesion', async () => {
    // Datos de prueba para iniciar sesión (incorrectos)
    const invalidLoginData = {
        username: 'userInvalido',
        password: 'no'
    };

    // Realizamos una solicitud POST al endpoint /login con datos incorrectos
    const response = await request(app)
      .post('/login')
      .send(invalidLoginData);

    // Verificamos que la respuesta tenga un código de estado 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
  });

  // Test /adduser endpoint
  it('deberia añadir usuario correctamente', async () => {
    const response = await request(app)
        .post('/adduser')
        .send({ username: 'newuser', password: 'newpassword' });

    // Verificamos que la respuesta tenga un código de estado 200 y un ID de usuario
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });
  
  // Probamos con una pregunta errónea
  it('debería devolver error con esa pregunta', async () => {
    const response = await request(app).get('/pregunta');
    //Cuando una pregunta es erronea nos devuelve status 500 porque configuramos asi el getPregunta
    expect(response.status).toBe(500);
    expect(typeof response.body.question).toBe('undefined');
    expect(response.body).toEqual({ error: 'Error desconocido'});
  });

  // Test para pregunta correcta
  it('deberia devolver 200 la pregunta porque es correcta', async () => {
    // Configurar el mock de axios para devolver una respuesta exitosa
    const mockData = { question: 'What is the capital of France?' };
    require('axios').get.mockResolvedValue({ data: mockData });

    // Realizar solicitud GET a la ruta /pregunta
    const response = await request(app).get('/pregunta');

    // Verificar que la respuesta sea exitosa y contenga los datos de la pregunta
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  // Prueba para la devolución de documentación
  it('debería devolver la documentación de Swagger correctamente', async () => {
    const response = await request(app)
      .get('/api-doc')
      .redirects(1); // Sigue un máximo de 1 redirección
  
    // Verificar que la respuesta tenga un código de estado 200 y contenga contenido HTML de la documentación de Swagger
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('debería redirigir correctamente a la documentación de Swagger', async () => {
    const response = await request(app)
      .get('/api-doc');
  
    // Verificar que la respuesta tenga un código de estado 301 y que la cabecera "Location" indique la ubicación de la redirección
    expect(response.statusCode).toBe(301);
    expect(response.headers['location']).toBe('/api-doc/');
  });

  it('debería devolver los datos del usuario correctamente', async () => {
    // Datos de prueba para simular una solicitud GET a /getUserData
    const userData = {
      username: 'testuser',
      // Otros datos del usuario que esperas recibir
    };

    // Mock de axios para simular una respuesta exitosa del servicio de usuario
    axios.get.mockResolvedValueOnce({ data: userData });

    // Realizar la solicitud GET a /getUserData con el nombre de usuario
    const response = await request(app)
      .get('/getUserData')
      .query({ username: 'testuser' });

    // Verificar que la respuesta sea exitosa (código de estado 200) y contenga los datos del usuario
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userData);
  });

  it('debería manejar correctamente los errores del servicio de usuario', async () => {
    // Simular un error del servicio de usuario
    const errorMessage = 'Error al obtener datos del usuario';
    axios.get.mockRejectedValueOnce({ response: { status: 500, data: { error: errorMessage } } });

    // Realizar la solicitud GET a /getUserData con un nombre de usuario
    const response = await request(app)
      .get('/getUserData')
      .query({ username: 'testuser' });

    // Verificar que la respuesta tenga el código de estado esperado (500) y contenga el mensaje de error adecuado
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  
});