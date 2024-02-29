// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../Estilos/juego.css';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const botonRespuesta = (event) => { 
  //comprobara si la respuesta es correcta o no 
  }

const Juego = ({isLogged}) => {
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <h2> PREGUNTA </h2>
      <div className="button-container">
        <button id="boton1" className="button" onClick={botonRespuesta}>RESPUESTA PRUEBA PARA VER CUANTO OCUPA 1</button>
        <button id="boton2" className="button" onClick={botonRespuesta}>RESPUESTA PRUEBA PARA VER UNA RESPUESTA LARGA</button>
        <button id="boton3" className="button" onClick={botonRespuesta}>RESPUESTA PRUEBA JEJE</button>
        <button id="boton4" className="button" onClick={botonRespuesta}>RESPUESTA PRUEBA PARA VER QUE TAL</button>
      </div>
    </Container>
  );
};



export default Juego;
