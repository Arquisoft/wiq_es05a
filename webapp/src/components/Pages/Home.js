// Importamos las bibliotecas necesarias
import React from 'react';
import '../Estilos/home.css';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Definimos el componente Home
const Home = ({isLogged, setIsLogged}) => {
  // Utilizamos el hook useNavigate para la navegación
  const navigate = useNavigate();

  // Definimos la función que se ejecutará al hacer clic en el botón "Jugar"
  const clickJugar = () => {
    // Navegamos a la ruta "/game"
    navigate("/game");
  }

  // Definimos la función que se ejecutará al hacer clic en el botón "Estadísticas"
  const clickEstadisticas = () => {
    // Navegamos a la ruta "/stats"
    navigate("/stats");
  }

  // Definimos la función que se ejecutará al hacer clic en el botón "Estadísticas"
  const clickIniciar = () => {
    // Navegamos a la ruta "/login"
    navigate("/login");
  }

  // Definimos la función que se ejecutará al hacer clic en el botón "Estadísticas"
  const clickRegistro = () => {
    // Navegamos a la ruta "/register"
    navigate("/register");
  }

  // Renderizamos el componente
  return (
    <>
    {!isLogged ? (
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Mostramos el título del juego */}
        <h1 className="titulo">WIQ 5A</h1>
        {/* Creamos un contenedor para los botones */}
        <div className="button-container">
          {/* Creamos el botón "Jugar" y le asignamos la función clickJugar al evento onClick */}
          <Button variant="contained" color="primary" className="button" id="btJugar" onClick={clickIniciar}>INICIA SESIÓN</Button>
          {/* Creamos el botón "Estadísticas" y le asignamos la función clickEstadisticas al evento onClick */}
          <Button variant="contained" color="secondary" className="button" id="btEstadisticas" onClick={clickRegistro}>REGÍSTRATE</Button>
        </div>
      </Container>) : (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Mostramos el título del juego */}
        <h1 className="titulo">WIQ 5A</h1>
        {/* Creamos un contenedor para los botones */}
        <div className="button-container">
          {/* Creamos el botón "Jugar" y le asignamos la función clickJugar al evento onClick */}
          <Button variant="contained" color="primary" className="button" id="btJugar" onClick={clickJugar}>JUGAR</Button>
          {/* Creamos el botón "Estadísticas" y le asignamos la función clickEstadisticas al evento onClick */}
          <Button variant="contained" color="secondary" className="button" id="btEstadisticas" onClick={clickEstadisticas}>ESTADÍSTICAS</Button>
        </div>
      </Container>
      )
    } 

    </>

  );
};

// Exportamos el componente para poder utilizarlo en otras partes de la aplicación
export default Home;