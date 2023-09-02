import React from "react";
import "./ChefCard.css"
import { Stars } from "./Stars";
export const ChefCard = props => {
    


    return(
            <div className="card-chef" onClick={props.onClick}>
                <img className="card-img" src={props.url} alt='Card image cap'/>
                <div className="card-body">
                    <h5 className="card-name">{props.firstname} {props.lastname}</h5>
                    <h5 className="card-restaurant">{props.Restaurante}</h5>
                </div>
            </div>
    )
}