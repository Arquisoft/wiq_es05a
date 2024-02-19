// Importa Express.js
const express = require('express');

// Crea una instancia de Express
const app = express();
const PORT = 3001;

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Definimos la URL de la API de Wikidata para buscar información sobre un tema específico
const searchUrl = 'https://www.wikidata.org/w/rest.php/wikibase/v0/entities/items/';

// Función para obtener información sobre un tema específico
function buscarInformacion(tema) {
    // Construimos la URL de búsqueda concatenando el tema a la URL base
    const url = searchUrl + tema
    console.log(url)

    // Realizamos la solicitud GET a la API de Wikidata
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Error al buscar información:', error));
}

// Ejemplo de uso: buscar información sobre el tema "JavaScript"
app.get('/search', (req, res) => {
    res.send('¡Hola, mundo!');
    buscarInformacion("Q42");
  });
