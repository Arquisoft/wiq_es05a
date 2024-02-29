// src/components/Login.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import '../Estilos/estadisticas.css';

const Juego = ({isLogged}) => {


  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <h2>ESTADÍSTICAS</h2>
        <table>
            <tbody>
                <tr>
                    <td>Nº Preguntas acertadas: </td>
                    <td> x </td>
                </tr>
                <tr>
                    <td>Nº Preguntas falladas: </td>
                    <td> x </td>
                </tr>
                <tr>
                    <td>Nº Juegos completados: </td>
                    <td> x </td>
                </tr>
                <tr>
                    <td>Tiempo medio por juego: </td>
                    <td> x </td>
                </tr>
            </tbody>
    </table>

    </Container>
  );
};

export default Juego;
