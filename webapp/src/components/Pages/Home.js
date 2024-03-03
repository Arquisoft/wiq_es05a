// src/components/Login.js
import React, { useState, useEffect } from 'react';
import '../Estilos/juego.css';
import { Container } from '@mui/material';

function clickJugar() {
  window.location.href = "game";
}

function clickEstadisticas() {
  window.location.href = "stats";
}

const Home = () => {
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <h1> WIQ_es05 </h1>
        <div className="button-container">
          <button id="botonJugar" className="button" onClick={() => clickJugar()}> JUGAR</button>
          <button id="botonEstadisticas" className="button" onClick={() => clickEstadisticas()}> ESTADÍSTICAS</button>
         </div>
      </Container>
      </>
  );
  };
  
  export default Home;