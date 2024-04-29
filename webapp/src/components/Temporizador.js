import React, { useState, useEffect } from 'react';

const Temporizador =({restart, tiempoInicial, tiempoAcabado, handleRestart})=> {

    //Constante que va restando segundos
    const [tiempoSegundos, setTiempoSegundos] = useState(tiempoInicial);
    //Constante que indica si el temporizador esta en pausa
    const [pausa, setPausa] = useState(false);

    useEffect(() => {
        let intervalID;
        if(restart){
            setTiempoSegundos(tiempoInicial);
            setPausa(false); 
            handleRestart();
        }

        if (tiempoSegundos > 0 && !pausa) {
            intervalID = setInterval(() => {
                setTiempoSegundos((prevTiempo) => prevTiempo - 1);
            }, 1000);
        }
        if(tiempoSegundos <= 0)
            tiempoAcabado();
        return () => clearInterval(intervalID);
    }, [tiempoSegundos, pausa, restart]);


    return (
        <div className="temporizador"> <p> {tiempoSegundos} </p> </div>
    )
}

export default Temporizador;