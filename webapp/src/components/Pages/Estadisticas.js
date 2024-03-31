// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import '../Estilos/estadisticas.css';
import axios from 'axios';


const Estadisticas = ({isLogged}) => {

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [completedGames, setCompletedGames] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
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
        setCorrectAnswers(datos.correctAnswers);
        setIncorrectAnswers(datos.incorrectAnswers);
        setCompletedGames(datos.completedGames);
        setAverageTime(datos.averageTime);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <h2>ESTADÍSTICAS</h2>
        <table>
            <tbody>
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
                <tr>
                    <td>Tiempo medio por juego: </td>
                    <td> {averageTime} </td>
                </tr>
            </tbody>
    </table>

    </Container>
  );
};

export default Estadisticas;
