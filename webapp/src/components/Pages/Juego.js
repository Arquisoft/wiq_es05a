// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Estilos/juego.css';
import { Container } from '@mui/material';
import Temporizador from '../Temporizador';
import { jwtDecode } from 'jwt-decode';

const Juego = ({isLogged, username}) => {
  //La pregunta (string)
  const [pregunta, setPregunta] = useState("")
  //La Respuesta correcta (string)
  const [resCorr, setResCorr] = useState("")
  //Array de las cuatros respuestas
  const [resFalse, setResFalse] = useState([])
  //constante booleana para saber si se ha respondido ya o no (si se ha pulsado un boton se pone a true)
  const [respondido, setRespodido] = useState(false)
  //constante para saber si ha ganado, booleana
  const [victoria, setVictoria] = useState(false)
  //Para saber si el temporizador se ha parado al haber respondido una respuesta
  const [pausarTemporizador, setPausarTemporizador] = useState(false)

  //Variables para la obtencion y modificacion de estadisticas del usuario
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');


  const updateCorrectAnswers = async () => {
    try {
        const response = await axios.get(`${apiEndpoint}/updateCorrectAnswers?username=${username}`);
        console.log('Respuesta correcta actualizada con éxito:', response.data);
        // Realizar otras acciones según sea necesario
    } catch (error) {
        console.error('Error al actualizar la respuesta correcta:', error);
        // Manejar el error de acuerdo a tus necesidades
    }
  };
  ////
  
  
  //Operacion asíncrona para cargar pregunta y respuestas en las variables desde el json
  //Esta operación es llamada cuando pregunta esté vacia.
  useEffect( () => {
    const crear = async () => {
      const response = await axios.get(`${apiEndpoint}/pregunta`);
      setPregunta(response.data.question)
      setResCorr(response.data.answerGood)
      setResFalse(response.data.answers)
    }
    if(pregunta == ""){
      setPregunta("CARGANDO...")
      crear();
    }
  }, [pregunta]);    


  /**
   * Funcion que se llamara al hacer click a una de las respuestas
   */
  const botonRespuesta = (respuesta) => { 
    //Comprueba si la respuesta es correcta o no y pone la variable victoria a true o false
    //por ahora esta variable no se utiliza para nada
    setRespodido(true)
    setPausarTemporizador(true);
    if(respuesta == resCorr){
      console.log("entro a respuesta correcta")
      //Aumenta en 1 en las estadisticas de juegos ganado
      updateCorrectAnswers();
      setVictoria(true)
    }
    else{
      setVictoria(false)
    }
    //storeResult(victoria)
    cambiarColorBotones(respuesta, true);

  };

  async function storeResult(res){
    if(res){
      const storeAcertado = await axios.post(`${apiEndpoint}/guardarAcierto`, {username, pregunta, resCorr});
    }
    else{
      const storeAcertado = await axios.post(`${apiEndpoint}/guardarFallo`, {username, pregunta, resCorr});
    }
  }

  /*
  * Para cambiar el color de los botones al hacer click en uno de ellos
  * True para modo pulsar uno de ellos (acertar/fallar)
  * False si se quiere mostrar color de todos (acabar el tiempo)
  */
  const cambiarColorBotones = (respuesta, bool) => { 
      //Obtenemos el contenedor de botones
      const buttonContainer = document.querySelector('.button-container');
      //Obtenemos los botones dentro del dicho contenedor
      const buttons = buttonContainer.querySelectorAll('.button');
      //Recorremos cada boton
      buttons.forEach((button) => {
        //Desactivamos TODOS los botones
        button.disabled=true; 
        //Ponemos el boton de la respuesta correcta en verde
        if(button.textContent.trim() == resCorr) {
          button.style.backgroundColor = "#05B92B";
          button.style.border = "6px solid #05B92B";
        }
        if(bool){
        //Ponemos el boton de la marcada en rojo si era incorrecta
          cambiarColorUno(respuesta, button);
        }else {
          cambiarColorTodos(button);
        }return button; //esta linea evita un warning de sonar cloud, sin uso
      });

  }

  function cambiarColorUno(respuesta, button){
    if(button.textContent.trim()==respuesta.trim()){
      if((button.textContent.trim() != resCorr)) {
        button.style.backgroundColor = "#E14E4E";
        button.style.border = "6px solid #E14E4E";
      }
    }
  }



  function cambiarColorTodos(button){
    if(button.textContent.trim() == resCorr) {
      button.style.backgroundColor = "#05B92B";
      button.style.border = "6px solid #05B92B";
    } else{
      button.style.backgroundColor = "#E14E4E";
          button.style.border = "6px solid #E14E4E";
    }
  } 
 
  //Funcion que se llama al hacer click en el boton Siguiente
  function clickSiguiente() {
    //Recarga la pagina para cambiar de pregunta
    window.location.href = "game";
  }

  
  return (
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <Temporizador tiempoInicial={20} tiempoAcabado={cambiarColorBotones} pausa={pausarTemporizador}/>
        <h2> {pregunta} </h2>
        <div className="button-container">
          <button id="boton1" className="button" onClick={() => botonRespuesta(resFalse[1])}> {resFalse[1]}</button>
          <button id="boton2" className="button" onClick={() => botonRespuesta(resFalse[2])}> {resFalse[2]}</button>
          <button id="boton3" className="button" onClick={() => botonRespuesta(resFalse[0])}> {resFalse[0]}</button>
          <button id="boton4" className="button" onClick={() => botonRespuesta(resFalse[3])}> {resFalse[3]}</button>
        </div>
        <button id="botonSiguiente" className="button" onClick={() =>clickSiguiente()} > SIGUIENTE</button>
      </Container>
  );
};

export default Juego;
