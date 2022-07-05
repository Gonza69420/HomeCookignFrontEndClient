import React , {useState} from "react";
import "./Popup.css"


export function Popup(props) {
    

    return (props.trigger) ? (
        <div className="popup">
            <div className={props.type}>
                <div className="positionButton">
                <button className="CloseButton" onClick={() => props.setTrigger(false)}> X </button>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}