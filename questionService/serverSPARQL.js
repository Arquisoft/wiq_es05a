// Importamos el módulo Express para crear un servidor web
const express = require('express');
// Importamos el módulo Axios para realizar solicitudes HTTP
const axios = require('axios');

// Creamos una nueva aplicación Express
const app = express();

// Definimos una ruta GET en '/pregunta'
app.get('/pregunta', async (req, res) => {
    // URL del endpoint SPARQL de Wikidata
    const url = "https://query.wikidata.org/sparql";
    // Consulta SPARQL para obtener países y sus capitales
    const query = `
    SELECT ?country ?countryLabel ?capital ?capitalLabel WHERE {
      ?country wdt:P31 wd:Q6256;
               wdt:P36 ?capital.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    LIMIT 50
    `;
    // Realizamos la solicitud HTTP GET al endpoint SPARQL con la consulta
    const response = await axios.get(url, { params: { format: 'json', query } });
    // Extraemos los resultados de la consulta
    const bindings = response.data.results.bindings;
    // Seleccionamos un índice aleatorio para la respuesta correcta
    const correctAnswerIndex = Math.floor(Math.random() * bindings.length);
    // Obtenemos la respuesta correcta
    const correctAnswer = bindings[correctAnswerIndex];
    // Creamos la pregunta
    const question = `¿Cuál es la capital de ${correctAnswer.countryLabel.value}?`;
    // Inicializamos las respuestas con la respuesta correcta
    const answers = [correctAnswer.capitalLabel.value];
    // Añadimos tres respuestas incorrectas
    for (let i = 0; i < 3; i++) {
        let randomIndex;
        do {
            // Seleccionamos un índice aleatorio distinto al de la respuesta correcta
            randomIndex = Math.floor(Math.random() * bindings.length);
        } while (randomIndex === correctAnswerIndex);
        // Añadimos la capital del país seleccionado aleatoriamente a las respuestas
        answers.push(bindings[randomIndex].capitalLabel.value);
    }
    // Mezclamos las respuestas
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiamos las respuestas en los índices i y j
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    // Enviamos la pregunta y las respuestas como respuesta a la solicitud HTTP
    res.json({ question, answers });
});

// Iniciamos el servidor en el puerto 3000
app.listen(2500, () => console.log('El servidor está escuchando en el puerto 2500'));
