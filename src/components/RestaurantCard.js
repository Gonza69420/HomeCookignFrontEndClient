import React from "react";
import './MenuCard.css';

export const RestaurantCard = props => {
    
    return (
        <div className="cardRestaurant">
            <img className="card-img-top" src={props.url} alt='Card image cap'/>
            <div className="card-body">
                <h5 className="cardtitle">{props.name}</h5>
            </div>
        </div>
    )
}