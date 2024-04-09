const request = require('supertest');
const app = require('./server'); 
const fs = require('fs');

afterAll(async () => {
  app.close();
});

describe('GET /pregunta', () => {
  it('debería devolver una pregunta y respuestas con éxito', async () => {
    const response = await request(app).get('/pregunta');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('answerGood');
    expect(response.body).toHaveProperty('answers');
    expect(response.body.answers).toHaveLength(4);
  });

 
  
});
