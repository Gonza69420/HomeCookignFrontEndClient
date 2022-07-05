import React from "react";
import { PedidosAceptarRechazar } from "../../components/pedidosAceptarRechazar";
import Navbar from '../../components/Navbar';


export const PedidosCliente = () =>{

    return(
        <div>
            <Navbar/>
            <div className='container mt-5'>
                <PedidosAceptarRechazar name="Agustin Tittoto" url="http://www.galiciaartabradigital.com/wp-content/uploads/2022/01/evia-300x282.jpg" Menu="Ñoquis de ricota" Fecha="23/43/2022" Hora="21:21" Localizacion="Lomas de zamora 2131" monto="4321"/>
            </div>
        </div>
    )

}