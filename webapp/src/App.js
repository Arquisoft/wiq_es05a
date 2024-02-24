import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from './components/AddUser';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import Login from './components/Login';
import Juego from './components/Pages/Juego';
import NotFound from './components/Pages/NotFound';

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <Layout/>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/game" element={<Juego />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<AddUser/>}/>

      </Routes>
      </Router>
    </>
  );
}

export default App;
