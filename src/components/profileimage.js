import React, { useEffect, useState } from "react";
import "./profileimage.css"

export const Profileimage = props => {

    return(
        <div className="imageprofile">
            <div className="image">
                <img className="imagespecific"src={props.src}/>
            </div>
        </div>
    )

    }

