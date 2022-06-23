import React from "react";
import { RiStarSFill , RiStarSLine } from "react-icons/ri";


export const Stars = props => {

    
    const StarsAmount = () => {
        if(props.stars <= 1){
            return(
                <div>
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
                <div>
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
                <div>
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
                <div>
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
        <div>
            {StarsAmount()}
        </div>
    )
}