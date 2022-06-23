import React from "react";

export const ChefCard = props => {
    []

    const handleClick = () => {

    }

    return(
            <div className="card" onClick={handleClick}>
                <img className="card-img" src={props.url} alt='Card image cap'/>
                <div className="card-body">
                    <h5 className="card-name">{props.name}</h5>
                    
                    <h5 className="card-name">{props.Restaurante}</h5>
                </div>
            </div>
    )
}