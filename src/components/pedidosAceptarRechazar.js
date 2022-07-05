import React from "react";
import "./pedidosAceptarRechazar.css"

export const PedidosAceptarRechazar = props => {

    /*const calculateMonto = () => {
        var monto = props.monto;
        return monto*1.05;
    }
*/
return(
    <div className="containerpedidos">
        <div className="TittlePart">
            <h5 className="Name"> {props.name} </h5>
            <img className="cardimg" src={props.url} alt='Card image'/>
        </div>
        <div className="info">
            <h5>Menu: {props.Menu}</h5>
            <h5>Fecha: {props.Fecha}</h5>
            <h5>Hora: {props.Hora}</h5>
            <h5>Localizacion: {props.Localizacion}</h5>
        </div>
        <h3 className="monto">Monto: ${props.monto}</h3>

    </div>
)
} 