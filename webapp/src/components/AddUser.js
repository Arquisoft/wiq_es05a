// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeError, setMensajeError] =useState('');

  const addUser = async () => {
    try {
      let valido = await validateCredentials(username, password);
      await axios.post(`${apiEndpoint}/adduser`, { username, password, valido, mensajeError });
      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  

  async function validateCredentials(username, password){
    try {
      const response = await axios.get(`${apiEndpoint}/getUsernames`);
      const usernames = response.data.usernames;
      if (usernames.includes(username)){
        setMensajeError('Credenciales incorrectas. El nombre de usuario esta en uso')
        setError('Credenciales incorrectas. El nombre de usuario esta en uso')
        return false; 
      }
      if (password.length < 8) {
        setMensajeError('Credenciales incorrectas. La contraseña debe contener al menos 8 caracteres')
        setError('Credenciales incorrectas. La contraseña debe contener al menos 8 caracteres')
        return false; 
      }
      return true;
    } catch (error) {
      setError('Error al cargar la información');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        Registrar Usuario
      </Typography>
      <TextField
        name="username"
        margin="normal"
        fullWidth
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        name="password"
        margin="normal"
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addUser}>
        Crear
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Usuario creado correctamente" />
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}
    </Container>
  );
};

export default AddUser;