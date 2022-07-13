import React, {useState} from "react";
import "./pedidosAceptarRechazar.css"
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

export const PedidosAceptarRechazar = props => {
    const[idSolcitud, setIdSolicitud] = useState(props.idSolcitud);
    const calculateMonto = (montos) => {
        var monto = montos;
        return parseInt(monto*1.05);
    }

    const onSubmit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/solicitude/acceptSolicitude/" + idSolcitud, requestOptions)
        .then(response => response.text())
        .then(result => {
            window.location.reload(false);
        })
        .catch(error => console.log('error', error));
    }

    const cancel = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/solicitude/deleteSolicitude/" + idSolcitud, requestOptions)
        .then(response => response.text())
        .then(result => {
            window.location.reload(false);
        })
        .catch(error => console.log('error', error));
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
            <div className="containerBotones">
                <button type="button" class="btn btn-success btn-lg" onClick={onSubmit}><BsCheckCircleFill/></button>
                <button type="button" class="btn btn-danger btn-lg" onClick={cancel}><BsFillXCircleFill/></button>
            </div>
        </div>
    </div>
)
} 