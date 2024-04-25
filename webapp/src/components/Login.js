// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import PropTypes from 'prop-types'

const Login = ({isLogged, setIsLogged, username, setUsername}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });
      // Extract data from the response
      const datos = response.data;

      setCreatedAt(datos.createdAt);
      setIsLogged(true);
      localStorage.setItem('isLogged', JSON.stringify(true));
      setUsername(datos.username)
      localStorage.setItem('username', JSON.stringify(datos.username))
      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      {isLogged ? (
        <div>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            ¡Buenas, {username}!
          </Typography>
          <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
            Tu cuenta fue creada el {new Date(createdAt).toLocaleDateString()}.
          </Typography>
        </div>
      ) : (
        <div>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            name="username"
            margin="normal"
            fullWidth
            label="Username"
            value={username}
      
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            name="password"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={loginUser}>
            Login
          </Button>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
        </div>
      )}
    </Container>
  );
};

Login.propTypes = {
  isLogged: PropTypes.bool,
  setIsLogged: PropTypes.func,
  username: PropTypes.string,
  setUsername: PropTypes.func
}

export default Login;