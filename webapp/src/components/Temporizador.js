import React, { useState, useEffect } from 'react';

const Temporizador =({tiempoInicial, tiempoAcabado, pausa})=> {

    //Constante que va restando segundos
    const [tiempoSegundos, setTiempoSegundos] = useState(tiempoInicial);
    

    useEffect(() => {
        let intervalID;

        if (tiempoSegundos > 0 && !pausa) {
        intervalID = setInterval(() => {
            setTiempoSegundos((prevTiempo) => prevTiempo - 1);
        }, 1000);
        }
        if(tiempoSegundos<=0)
            tiempoAcabado();
        return () => clearInterval(intervalID);
    }, [tiempoSegundos, pausa]);

    return (
        <div className="temporizador"> <p> {tiempoSegundos} </p> </div>
    )
}

export default Temporizador;