import React from "react";
import "./pedidosAceptarRechazar.css"
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

export const PedidosPasados = props => {


    const calculateMonto = (montos) => {
        var monto = montos;
        return parseInt(monto*1.05);
    }

    return(
        <div className="containerpedidos">
        <div className="TittlePart">
            <h3 className="Name"> {props.name} </h3>
            <img className="cardimg" src={props.url} alt='Card image'/>

        </div>

        <div className="info">
  
            <h5>Menu: {props.Menu}</h5>
            <h5>Fecha: {props.Fecha}</h5>
            <h5>Hora: {props.Hora}</h5>
            <h5>Localizacion: {props.Localizacion}</h5>
        </div>
        <div className="containerMonto">
            <h3 className="monto">Monto: ${calculateMonto(props.monto)}</h3>
        </div>
    </div>
    )
}