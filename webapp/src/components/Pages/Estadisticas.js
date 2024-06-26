import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import '../Estilos/estadisticas.css';
import axios from 'axios';
import PropTypes from 'prop-types'


const Estadisticas = ({isLogged, username}) => {

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [error, setError] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [completedGames, setCompletedGames] = useState(0);
    const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      statsUser();
      setFirstRender(true);
    }
  }, [firstRender])

    
    async function statsUser(){
      try {
        const response = await axios.get(`${apiEndpoint}/getUserData?username=${username}`);
        const datos = response.data;
        setCorrectAnswers(datos.user.correctAnswers);
        setIncorrectAnswers(datos.user.incorrectAnswers);
        setCompletedGames(datos.user.completedGames);
      } catch (error) {
        setError('Error al cargar la información');
      }
    };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <h2>ESTADÍSTICAS</h2>
        {error && <p style={{ textAlign: 'center', color: 'red', backgroundColor:'white', fontWeight: 'bold' }}>{error}</p>}
        <table>
            <tbody>
                <tr>
                  <th scope="col">Estadistica</th>
                  <th scope="col">Valor</th>
                </tr>
                <tr>
                    <td>Nº Preguntas acertadas: </td>
                    <td> {correctAnswers} </td>
                </tr>
                <tr>
                    <td>Nº Preguntas falladas: </td>
                    <td> {incorrectAnswers} </td>
                </tr>
                <tr>
                    <td>Nº Juegos completados: </td>
                    <td> {completedGames} </td>
                </tr>
            </tbody>
    </table>

    </Container>
  );
};

Estadisticas.propTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string
}


export default Estadisticas;
