import React from "react";
import { Profileimage } from "./profileimage";
import { Stack } from "react-bootstrap";
import { Stars } from "./Stars";
import "./reviewCard.css"
export const ReviewCard = props => {

    return(
        <div className="reviewCardContainer">
            <Stack direction="horizontal" className='justify-content-start mt-2' gap={1}>
            <Profileimage classname="reviewimageprofile" personalizar={false} src={props.src}/>
            <h6 className="pt-1">{props.firstname}</h6>
            <h6 className="pt-1">{props.lastname}</h6>
            <Stars stars={props.stars}/>
            </Stack>
            
                <h6 className="ReviewText">{props.review}</h6>
            
        </div>
    )

}