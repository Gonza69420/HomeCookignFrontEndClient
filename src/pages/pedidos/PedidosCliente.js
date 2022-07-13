import React, { useEffect, useState } from "react";
import { PedidosAceptarRechazar } from "../../components/pedidosAceptarRechazar";
import Navbar from '../../components/Navbar';
import {PedidosPasados} from "../../components/pedidosPasados";
import "./PedidosCliente.css";
export const PedidosCliente = () =>{
    const[solicitudesParaAceptar, setSolicitudesParaAceptar] = useState([]);
    const [isSolicitudesParaAceptarEmpty, setIsSolicitudesParaAceptarEmpty] = useState(false);

    const[solicitudesPasadas, setsolicitudesPasadas] = useState([]);
    const[isSolicitudesPasadasEmpty, setIsSolicitudesPasadasEmpty] = useState(true);

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }

    }, [])

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/solicitude/getPendingSolicitudesByClient/" + sessionStorage.getItem('mail'), requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            solicitudesParaAceptar[0] = JSON.parse(result);
            
            if(solicitudesParaAceptar[0][0].id !== undefined){
                setIsSolicitudesParaAceptarEmpty(true);
            }
            })
        .catch(error => console.log('error', error));


    }, [])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8080/solicitude/getAcceptedSolicitudesByClient/" + sessionStorage.getItem("mail"), requestOptions)
          .then(response => response.text())
          .then(result =>{ 
            console.log(JSON.parse(result))
            solicitudesPasadas[0] = (JSON.parse(result));

            if(solicitudesPasadas[0][0].id !== undefined){
                setIsSolicitudesPasadasEmpty(true);
                console.log(isSolicitudesPasadasEmpty)
                console.log(solicitudesPasadas[0])
            }
        })
          .catch(error => console.log('error', error));
        
    }, [])

    return(
        <div>
            <Navbar/>
            <div className='container mt-5'>
                <div className="containerTittles">
                    <h2 className="Tittles">Pedidos Pendientes</h2>
                </div>
                <div className="ContainerPedidosPage">
                    {isSolicitudesParaAceptarEmpty &&
                    <>
                    {solicitudesParaAceptar[0].map(solicitud => {
                        return(
                            <PedidosAceptarRechazar name={solicitud.fullNameChef} url={solicitud.chefPhoto} Menu={solicitud.menuName} Fecha={solicitud.date} Hora={solicitud.hour} Localizacion={solicitud.address} monto={solicitud.price} idSolcitud= {solicitud.id}/>

                        )
                    })}
                    </>
                    }
                </div>
                <div className="containerTittles">

                <h2 className="Tittles">Pedidos Aceptados</h2>
                </div>
                <div className="ContainerPedidosPage">
                    {solicitudesPasadas.length > 0 &&
                    <>
                    {solicitudesPasadas[0].map((solicitud, index) => {
                        return(
                        <PedidosPasados name={solicitud.fullNameChef} url={solicitud.chefPhoto} Menu={solicitud.menuName} Fecha={solicitud.date} Hora={solicitud.hour} Localizacion={solicitud.address} monto={solicitud.price}/>                  
                    )})}
                    </>
                    }

                    

                </div>

                
            </div>
        </div>
    )

}