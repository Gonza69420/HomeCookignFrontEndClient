import React from "react";
import "./ChefCard.css"
import { Stars } from "./Stars";
export const ChefCard = props => {
    


    return(
            <div className="card-chef">
                <img className="card-img" src={props.url} alt='Card image cap'/>
                <div className="card-body">
                    <h5 className="card-name">{props.name}</h5>
                    <Stars className="starss" stars={props.starts}/>
                    <h5 className="card-restaurant">{props.Restaurante}</h5>
                </div>
            </div>
    )
}