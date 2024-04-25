// Importamos el módulo Express para crear un servidor web
let express = require('express');
// Importamos el módulo Axios para realizar solicitudes HTTP
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const promBundle = require('express-prom-bundle');

const crypto = require('crypto');

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

let corsOptions = {
    origin: 'http://localhost:8000'
};

// Creamos una nueva aplicación Express
let app = express();
app.disable("x-powered-by") //disable default information of express
app.use(cors(corsOptions));

// Cargamos las consultas SPARQL desde el fichero de configuración
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// Definimos una ruta GET en '/pregunta'
app.get('/pregunta', async (req, res) => {
    try{
        let buf = crypto.randomBytes(1);
        let randomValue = buf[0]/255;
        // Seleccionamos una consulta SPARQL de forma aleatoria del fichero de configuración
        const questionItem = questions[Math.floor(randomValue * questions.length)];

        // URL del endpoint SPARQL de Wikidata
        const url = "https://query.wikidata.org/sparql";
        // Consulta SPARQL seleccionada
        const query = questionItem.query;

        // Realizamos la solicitud HTTP GET al endpoint SPARQL con la consulta
        const response = await axios.get(url, { params: { format: 'json', query } });
        // Extraemos los resultados de la consulta
        const bindings = response.data.results.bindings;

        // Patrón para identificar los códigos de Wikidata
        let wikidataCodePattern = /^Q\d+$/;
        let correctAnswer = null;
        let correctAnswerIndex = 0;

        do {
            buf = crypto.randomBytes(1)
            randomValue = buf[0]/255
            // Seleccionamos un índice aleatorio para la respuesta correcta
            correctAnswerIndex = Math.floor(randomValue * bindings.length);
            // Obtenemos la respuesta correcta
            correctAnswer = bindings[correctAnswerIndex];
        } while (wikidataCodePattern.test(correctAnswer.questionSubjectLabel.value) || wikidataCodePattern.test(correctAnswer.answerSubjectLabel.value));

        // Creamos la pregunta
        const question = questionItem.question.replace('{sujetoPregunta}', correctAnswer.questionSubjectLabel.value);
        
        // Inicializamos las respuestas con la respuesta correcta
        const answerGood = correctAnswer.answerSubjectLabel.value;
        const answers = [answerGood];
        // Añadimos tres respuestas incorrectas
        for (let i = 0; i < 3; i++) {
            let randomIndex;
            do {
            buf = crypto.randomBytes(1)
            randomValue = buf[0]/255
            // Seleccionamos un índice aleatorio distinto al de la respuesta correcta
            randomIndex = Math.floor(randomValue * bindings.length);
            } while (randomIndex === correctAnswerIndex || wikidataCodePattern.test(bindings[randomIndex].answerSubjectLabel.value) 
                        || answers.includes(bindings[randomIndex].answerSubjectLabel.value));
            // Añadimos la capital del país seleccionado aleatoriamente a las respuestas
            answers.push(bindings[randomIndex].answerSubjectLabel.value);
        }
        // Mezclamos las respuestas
        for (let i = answers.length - 1; i > 0; i--) {
            buf = crypto.randomBytes(1)
            randomValue = buf[0]/255
            const j = Math.floor(randomValue * (i + 1));
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