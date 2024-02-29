// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const Juego = ({isLogged}) => {


  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <h2> PREGUNTA </h2>
      <div> RESP 1</div>
      <div> RESP 2</div>
      <div> RESP 3</div>
      <div> RESP 4</div>
    </Container>
  );
};

export default Juego;
