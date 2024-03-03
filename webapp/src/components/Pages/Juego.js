// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Estilos/juego.css';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const Juego = ({isLogged}) => {
  const [pregunta, setPregunta] = useState("")
  const [resCorr, setResCorr] = useState("")
  const [resFalse, setResFalse] = useState([])
  const [respondido, setRespodido] = useState(false)
  const [victoria, setVictoria] = useState(false)

  const botonRespuesta = (respuesta) => { 
    //comprobara si la respuesta es correcta o no 
    setRespodido(true)
    if(respuesta == resCorr){
      console.log("entro a respuesat correcta")
      setVictoria(true)
    }
    else{
      setVictoria(false)
    }
  };
  
  async function CargarPregunta(pregunta, resCorr, resFalse){
    useEffect(() => {
      fetch("http://localhost:2500/pregunta")
        .then((res) => res.json())
        .then((todo) => {
          setPregunta(todo.question)
          setResCorr(todo.answerGood)
          setResFalse(todo.answers)
        });
    }, []);
    console.log(pregunta);
    console.log(resCorr);
    console.log(resFalse)
  }

  CargarPregunta(pregunta, resCorr, resFalse);
  
  
  return (
    <>
    {respondido ? (
      <>
      {victoria ? (
        <h2> ACERTASTE </h2>
      ) : (
        <h2> FALLASTE </h2>
      )}
      </>
      ) : (
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <h2> {pregunta} </h2>
        <div className="button-container">
          <button id="boton1" className="button" onClick={() => botonRespuesta(resFalse[1])}>{resFalse[1]}</button>
          <button id="boton2" className="button" onClick={() => botonRespuesta(resFalse[2])}>{resFalse[2]}</button>
          <button id="boton3" className="button" onClick={() => botonRespuesta(resFalse[0])}>{resFalse[0]}</button>
          <button id="boton4" className="button" onClick={() => botonRespuesta(resFalse[3])}>{resFalse[3]}</button>
        </div>
      </Container>
      )}
      </>
  );
};



export default Juego;
