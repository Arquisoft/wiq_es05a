// Importamos el módulo Express para crear un servidor web
const express = require('express');
// Importamos el módulo Axios para realizar solicitudes HTTP
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

// Creamos una nueva aplicación Express
const app = express();
app.use(cors());

// Cargamos las consultas SPARQL desde el fichero de configuración
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// Definimos una ruta GET en '/pregunta'
app.get('/pregunta', async (req, res) => {
    try{
        // Seleccionamos una consulta SPARQL de forma aleatoria del fichero de configuración
        const questionItem = questions[Math.floor(Math.random() * questions.length)];

        // URL del endpoint SPARQL de Wikidata
        const url = "https://query.wikidata.org/sparql";
        // Consulta SPARQL seleccionada
        const query = questionItem.query;

        // Realizamos la solicitud HTTP GET al endpoint SPARQL con la consulta
        const response = await axios.get(url, { params: { format: 'json', query } });
        // Extraemos los resultados de la consulta
        const bindings = response.data.results.bindings;

        let wikidataCodePattern = /^Q\d+$/;
        let correctAnswer = null;
        let correctAnswerIndex = 0;

        do {
            // Seleccionamos un índice aleatorio para la respuesta correcta
            correctAnswerIndex = Math.floor(Math.random() * bindings.length);
            // Obtenemos la respuesta correcta
            correctAnswer = bindings[correctAnswerIndex];
        } while (wikidataCodePattern.test(correctAnswer.questionSubjectLabel.value));

        // Creamos la pregunta
        console.log(questionItem.question);
        const question = questionItem.question.replace('{sujetoPregunta}', correctAnswer.questionSubjectLabel.value);
        
        // Inicializamos las respuestas con la respuesta correcta
        const answerGood = correctAnswer.answerSubjectLabel.value;
        const answers = [answerGood];
        // Añadimos tres respuestas incorrectas
        for (let i = 0; i < 3; i++) {
            let randomIndex;
            do {
                // Seleccionamos un índice aleatorio distinto al de la respuesta correcta
                randomIndex = Math.floor(Math.random() * bindings.length);
            } while (randomIndex === correctAnswerIndex);
            // Añadimos la capital del país seleccionado aleatoriamente a las respuestas
            answers.push(bindings[randomIndex].answerSubjectLabel.value);
        }
        // Mezclamos las respuestas
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Intercambiamos las respuestas en los índices i y j
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        // Enviamos la pregunta y las respuestas como respuesta a la solicitud HTTP
        res.status(200).json({ question: question, answerGood: answerGood, answers: answers });
    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Iniciamos el servidor en el puerto 8003
const server = app.listen(8003, () => console.log('El servidor está escuchando en el puerto 8003'));

module.exports = server