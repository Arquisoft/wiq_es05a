// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Estilos/juego.css';
import { Container } from '@mui/material';
import Temporizador from '../Temporizador';

const Juego = ({isLogged, username, numPreguntas}) => {
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
  const [restartTemporizador, setRestartTemporizador] = useState(false)
  const [firstRender, setFirstRender] = useState(false);
  const[ready, setReady] = useState(false)
  const [numPreguntaActual, setNumPreguntaActual] = useState(0)
  const [arPreg, setArPreg] = useState([])
  const [finishGame, setFinishGame] = useState(false)
  const [numRespuestasCorrectas, setNumRespuestasCorrectas] = useState(0)
  const [numRespuestasIncorrectas, setNumRespuestasIncorrectas] = useState(0)

  //Variables para la obtencion y modificacion de estadisticas del usuario
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //Primer render para un comportamiento diferente
  useEffect(() => {
    if (!firstRender) {
      crearPreguntas(10);
      setFirstRender(true);
    }
  }, [firstRender])


  //Control de las estadísticas
  const updateStats = async () => {
    try {
        const response = await axios.get(`${apiEndpoint}/updateStats?username=${username}&numRespuestasCorrectas=${numRespuestasCorrectas}&numRespuestasIncorrectas=${numRespuestasIncorrectas}`);
        console.log('Estadisticas actualizadas con éxito:', response.data);
    } catch (error) {
        console.error('Error al actualizar las estadisticas:', error);
    }
  };

  //Función que genera un numero de preguntas determinado
  async function crearPreguntas(numPreguntas){
    setPausarTemporizador(true)
    let tempArray=[];
    while(numPreguntas>0){
      console.log("contador:" + numPreguntas)
      console.log("TAMAÑO ARRAY: " + tempArray.length)
      try {
        const response = await axios.get(`${apiEndpoint}/pregunta`);
        console.log("pregunta: " + response.data.question)
        console.log("buenarespuesta: " + response.data.answerGood)
        console.log("malasrespuestas: " + response.data.answers)
        tempArray.push(
          { id: numPreguntas, pregunta: response.data.question, resCorr: response.data.answerGood, resFalse: response.data.answers}
        )
        arPreg.push(
          { id: numPreguntas, pregunta: response.data.question, resCorr: response.data.answerGood, resFalse: response.data.answers}
        )
      }
      catch (error) {
        console.error('Error al actualizar las estadisticas:', error);
        // Manejar el error de acuerdo a tus necesidades
      }
      numPreguntas--;
    }
    setReady(true)
    setPausarTemporizador(false)
    updateGame();
    setNumPreguntaActual(numPreguntaActual+1);
  }

  //Función que actualiza la pregunta que se muestra en pantalla
  async function updateGame(){
    setPregunta(arPreg[numPreguntaActual].pregunta)
    setResCorr(arPreg[numPreguntaActual].resCorr)
    setResFalse(arPreg[numPreguntaActual].resFalse)
    //Poner temporizador a 20 de nuevo
    setRestartTemporizador(true);
  }


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
      setNumRespuestasCorrectas(numRespuestasCorrectas+1);
      console.log("Correctas: "+numRespuestasCorrectas)
      setVictoria(true)
    }
    else{
      setNumRespuestasIncorrectas(numRespuestasIncorrectas + 1);
      console.log("Incorrectas: "+numRespuestasIncorrectas)
      setVictoria(false)
    }
    //storeResult(victoria)
    cambiarColorBotones(respuesta, true);

  };

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

  //Función que cambia el color de un solo boton (acierto)
  function cambiarColorUno(respuesta, button){
    if(button.textContent.trim()==respuesta.trim()){
      if((button.textContent.trim() != resCorr)) {
        button.style.backgroundColor = "#E14E4E";
        button.style.border = "6px solid #E14E4E";
      }
    }
  }

  //Funcion que cambia el color de todos los botones (fallo)
  function cambiarColorTodos(button){
    if(button.textContent.trim() == resCorr) {
      button.style.backgroundColor = "#05B92B";
      button.style.border = "6px solid #05B92B";
    } else{
      button.style.backgroundColor = "#E14E4E";
          button.style.border = "6px solid #E14E4E";
    }
  } 

  //Función que devuelve el color original a los botones (siguiente)
  async function descolorearTodos(){
    console.log("entra descolorear")
    const buttonContainer = document.querySelector('.button-container');
    const buttons = buttonContainer.querySelectorAll('.button');
    buttons.forEach((button) => {
      console.log("boton: " + button)
      //Desactivamos TODOS los botones
      button.disabled=false; 
      //Ponemos el boton de la respuesta correcta en verde
        button.style.backgroundColor = "#FFFFFF";
      })
    buttonContainer.querySelector('#boton1').style.border = "6px solid #E14E4E";
    buttonContainer.querySelector('#boton2').style.border = "6px solid #CBBA2A";
    buttonContainer.querySelector('#boton3').style.border = "6px solid #05B92B";
    buttonContainer.querySelector('#boton4').style.border = "6px solid #1948D9";
    console.log("termina descolorear")
  } 

  //Primer render para un comportamiento diferente
  useEffect(() => {
    //updateCompletedGames()
  }, [finishGame])
 
  //Funcion que se llama al hacer click en el boton Siguiente
  const clickSiguiente = () => {
    if(numPreguntaActual==numPreguntas){
      setFinishGame(true)
      setReady(false)
      //finishGame()
      return
    }
    descolorearTodos()
    setNumPreguntaActual(numPreguntaActual+1)
    console.log(numPreguntaActual)
    updateGame();
    //Recargar a 20 el temporizador
    setRestartTemporizador(true);
    setPausarTemporizador(false);
  }

  //Funcion que se llama al hacer click en el boton Siguiente
  const clickFinalizar = () => {
    updateStats();
  }

  const handleRestart = () => {
    setRestartTemporizador(false); // Cambia el estado de restart a false, se llama aqui desde Temporizador.js
  };
  

  
  return (
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        {ready ? <>
          <div className="numPregunta"> <p> {numPreguntaActual} / {numPreguntas} </p> </div>
          <Temporizador restart={restartTemporizador} tiempoInicial={20} tiempoAcabado={cambiarColorBotones} pausa={pausarTemporizador} handleRestart={handleRestart}/>
          <h2> {pregunta} </h2>
          <div className="button-container">
            <button id="boton1" className="button" onClick={() => botonRespuesta(resFalse[1])}> {resFalse[1]}</button>
            <button id="boton2" className="button" onClick={() => botonRespuesta(resFalse[2])}> {resFalse[2]}</button>
            <button id="boton3" className="button" onClick={() => botonRespuesta(resFalse[0])}> {resFalse[0]}</button>
            <button id="boton4" className="button" onClick={() => botonRespuesta(resFalse[3])}> {resFalse[3]}</button>
          </div>
          <button id="botonSiguiente" className="button" onClick={() =>clickSiguiente()} > SIGUIENTE</button>
          </>
        : <h2> CARGANDO... </h2>}
        {finishGame ? <>
          <h2> PARTIDA FINALIZADA </h2>
          <button id="botonSiguiente" className="button" onClick={() =>clickFinalizar()} > FINALIZAR PARTIDA</button>
          </> : <></>}
      </Container>
  );
};

export default Juego;
