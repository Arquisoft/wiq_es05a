// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Estilos/juego.css';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const Juego = ({isLogged}) => {
  const [pregunta, setPregunta] = useState("")
  //Respuesta correcta
  const [resCorr, setResCorr] = useState("")
  const [resFalse, setResFalse] = useState([])
  const [respondido, setRespodido] = useState(false)
  const [victoria, setVictoria] = useState(false)

  const botonRespuesta = (respuesta) => { 
    //comprobara si la respuesta es correcta o no 
    setRespodido(true)
    if(respuesta == resCorr){
      console.log("entro a respuesta correcta")
      setVictoria(true)
    }
    else{
      setVictoria(false)
    }
    
    //Cambiar color de botones
    const buttonContainer = document.querySelector('.button-container');
    const buttons = buttonContainer.querySelectorAll('.button');
    const botonEncontrado = Array.from(buttons).find((button) => {
      button.disabled=true; //desactivamos todos los botones
        if(button.textContent.trim()==respuesta.trim()){
          //Si era la cambiamos color fondo a verde, si no a rojo
          if(button.textContent.trim() == resCorr) {
            button.style.backgroundColor = "#05B92B";
            button.style.border = "6px solid #05B92B";
          } else {
            button.style.backgroundColor = "#E14E4E";
            button.style.border = "6px solid #E14E4E";
          }
        }
    });

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
    //console.log(pregunta);
    //console.log(resCorr);
    //console.log(resFalse)

    
  }

  function clickSiguiente() {
    window.location.href = "game";
  }

  CargarPregunta(pregunta, resCorr, resFalse);
  
  
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <h2> {pregunta} </h2>
        <div className="button-container">
          <button id="boton1" className="button" onClick={() => botonRespuesta(resFalse[1])}> {resFalse[1]}</button>
          <button id="boton2" className="button" onClick={() => botonRespuesta(resFalse[2])}> {resFalse[2]}</button>
          <button id="boton3" className="button" onClick={() => botonRespuesta(resFalse[0])}> {resFalse[0]}</button>
          <button id="boton4" className="button" onClick={() => botonRespuesta(resFalse[3])}> {resFalse[3]}</button>
        </div>
        <button id="botonSiguiente" className="button" onClick={() =>clickSiguiente()} > SIGUIENTE</button>
      </Container>
      </>
  );
};



export default Juego;
