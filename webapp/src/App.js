import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddUser from './components/AddUser';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import Login from './components/Login';
import Juego from './components/Pages/Juego';
import Estadisticas from './components/Pages/Estadisticas';
import NotFound from './components/Pages/NotFound';

function App() {
  const [isLogged, setIsLogged] = useState(false);

//Si intenta acceder a una ruta privada (en este caso Estadistica) se le redirigira al login
function PrivateRoute({ element, ...props }) {
  return isLogged ? element : <Navigate to="/login" />;
 }

  return (
    <>
      <Layout/>
      <Router>
      <Routes>
        <Route path="/" element={<Home isLogged={isLogged}/>}></Route>
        <Route path="/game" element={<Juego isLogged={isLogged}/>} /> 
        <Route path="/login" element={<Login isLogged={isLogged}/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<AddUser isLogged={isLogged}/>}/>
        
        <Route
            path="/stats"
            element={<PrivateRoute element={<Estadisticas />} />}
        />

      </Routes>
      </Router>
    </>
  );
}

export default App;
