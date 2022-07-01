import React from "react";
import './MenuCard.css';
export const MenuCard = props => {

    const handleClick = () => {
        window.location.href = '/personalizar';
    }

    return (
        <div className="card" onClick={handleClick}>
            <img className="card-img-top" src={props.url} alt='Card image cap'/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    )
}