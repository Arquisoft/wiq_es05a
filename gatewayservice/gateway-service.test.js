// Importamos el módulo 'supertest' para realizar pruebas HTTP
const request = require('supertest');
// Importamos el módulo 'axios' para realizar solicitudes HTTP
const axios = require('axios');
// Importamos la aplicación de la puerta de enlace desde './gateway-service'
const app = require('./gateway-service'); 

// Importamos Locust para realizar pruebas de rendimiento
const { spawn } = require('child_process');

// Después de que se ejecuten todas las pruebas, cerramos la aplicación
afterAll(async () => {
    app.close();
});

// Creamos un mock (simulación) del módulo 'axios' para controlar las respuestas simuladas
jest.mock('axios');

// Definimos un bloque de pruebas llamado 'Gateway Service'
describe('Gateway Service', () => {
    // Simulamos respuestas de servicios externos para las rutas '/login' y '/adduser'
    axios.post.mockImplementation((url, data) => {
        if (url.endsWith('/login')) {
            return Promise.resolve({ data: { token: 'mockedToken' } });
        } else if (url.endsWith('/adduser')) {
            return Promise.resolve({ data: { userId: 'mockedUserId' } });
        }
    });

    // Prueba para la ruta '/adduser'
    it('should forward add user request to user service', async () => {
        const response = await request(app)
            .post('/adduser')
            .send({ username: 'newuser', password: 'newpassword' });

        // Verificamos que la respuesta tenga un código de estado 200 y un ID de usuario
        expect(response.statusCode).toBe(200);
        expect(response.body.userId).toBe('mockedUserId');
    });

    // Prueba para el endpoint /pregunta
    it('should forward question request to question service', async () => {
      // Realizamos una solicitud GET al endpoint /pregunta
      const response = await request(app)
          .get('/pregunta');

      // Verificamos que la respuesta tenga un código de estado 200 y contenga datos de pregunta
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('question'); // Asegúrate de ajustar esto según la respuesta esperada
  });

  // Prueba de seguridad para el endpoint /login
  it('should handle authentication securely', async () => {
    // Datos de prueba para iniciar sesión
    const loginData = {
        username: 'testuser',
        password: 'testpassword'
    };

    // Realizamos una solicitud POST al endpoint /login
    const response = await request(app)
        .post('/login')
        .send(loginData);

    // Verificamos que la respuesta tenga un código de estado 200
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Prueba de manejo de errores para el endpoint /login
  it('should handle authentication errors gracefully', async () => {
    // Datos de prueba para iniciar sesión (incorrectos)
    const invalidLoginData = {
        username: 'invaliduser',
        password: 'invalidpassword'
    };

    // Realizamos una solicitud POST al endpoint /login con datos incorrectos
    const response = await request(app)
        .post('/login')
        .send(invalidLoginData);

    // Verificamos que la respuesta tenga un código de estado 401 (Unauthorized)
    expect(response.statusCode).toBe(401);
});

  // Prueba de rendimiento para el endpoint /login utilizando Locust
  it('should handle authentication securely under load', async () => {
    // Iniciamos Locust en segundo plano
    const locustProcess = spawn('locust', ['-f', 'path/to/locustfile.py']);

    // Esperamos un tiempo para que Locust se inicie
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Realizamos una solicitud POST al endpoint /login con múltiples usuarios simultáneos
    const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpassword' });

    // Verificamos que la respuesta tenga un código de estado 200
    expect(response.statusCode).toBe(200);

    // Detenemos el proceso de Locust
    locustProcess.kill();
  });
  //test prueba
});