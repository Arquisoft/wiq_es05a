import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from './components/AddUser';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import Login from './components/Login';
import Juego from './components/Pages/Juego';
import Estadisticas from './components/Pages/Estadisticas';
import NotFound from './components/Pages/NotFound';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    if (storedIsLogged) {
      setIsLogged(JSON.parse(storedIsLogged));
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(JSON.parse(storedUsername));
    }
  }, []);

//Si intenta acceder a una ruta privada (en este caso Estadistica) se le redirigira al login
 function PrivateRoute({ element, ...props }) {
  const navigate = useNavigate();
  if (!isLogged) {
    navigate('/login');
    return null;
  }
  return element;
}

  return (
      <Router>
      <Layout isLogged={isLogged} setIsLogged={setIsLogged}  />
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged}/>}></Route>
          <Route path="/game" 
          element={<PrivateRoute element={<Juego isLogged={isLogged} username={username} numPreguntas={10}/>} />}
          />
          <Route path="/login" element={<Login isLogged={isLogged} setIsLogged={setIsLogged}  username={username} setUsername={setUsername}/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<AddUser/>}/>
          
          <Route
              path="/stats"
              element={<PrivateRoute element={<Estadisticas isLogged={isLogged} username={username} />} />}
          />

        </Routes>
      </Router>
  );
}

export default App;
