import React from "react";
import { RiStarSFill , RiStarSLine } from "react-icons/ri";
import "./Stars.css"

export const Stars = props => {

    
    const StarsAmount = () => {
        if(props.stars <= 1){
            return(
                <div className="stars">
                    <RiStarSFill/>
                    <RiStarSLine/>
                    <RiStarSLine/>
                    <RiStarSLine/>
                    <RiStarSLine/>
                </div>
            )
        }
        else if(props.stars == 2){
            return(
                <div className="stars">
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSLine/>
                    <RiStarSLine/>
                    <RiStarSLine/>
                </div>
            )
        }
        else if(props.stars == 3){
            return(
                <div>
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSLine/>
                    <RiStarSLine/>
                </div>
            )
        }
        else if(props.stars == 4){
            return(
                <div className="stars">
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSLine/>
                </div>
            )
        }
        else{
            return(
                <div className="stars">
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSFill/>
                    <RiStarSFill/>
                </div>
            )
        }
    }
    
    return(
        <div className="starcontainer">
            {StarsAmount()}
        </div>
    )
}