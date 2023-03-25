import React, {useState} from "react";
import './MenuCard.css';
import { Popup } from "./Popup";
import { Stack } from "react-bootstrap";
import { ReviewCard } from "./reviewCard";
import {Box, Modal} from "@mui/material";
export const MenuCard = props => {
    const [menuPopUp , setmenuPopUp] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    
    return (
        <>
        {!eliminar &&
            <>
            <div className="card" onClick={() => setmenuPopUp(true)}>
                <img className="card-img-top" src={props.url} alt='Card image cap'/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.shortDescription}</p>
                </div>
            </div>


            <Modal open={menuPopUp} onClose={()=> setmenuPopUp(false)} >
            <Box className={"BoxMenuCard"}>
            <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
            <h1 className="topright">{props.name}</h1>
            <img className ="MenuImage" src={props.url}/>
            </Stack>
            <h3 className='d-flex justify-content-start mt-4 mb-4'>Descripcion:</h3>
            <p className='totheright'>{props.description}</p>

            <h2 className={"precioMenuCard"}> {"Precio: $" + props.price}</h2>
            </Box>
            </Modal>
            </>
    }
    </>
    )
}