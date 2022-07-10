import React, { useEffect, useState } from "react";
import "./profileimage.css"
import { storage } from "../firebase";
import { ref , uploadBytes} from "firebase/storage";

export const Profileimage = props => {
    const [personalizar , setPersonalizar] = useState(!props.personalizar);
    const [imageUpload , setImageUpload] = useState(null);
    
    const uploadImage = () => {
        console.log(sessionStorage.getItem("token"));

        console.log(sessionStorage.getItem("mail"));
        if(imageUpload === null) return;
        const imageRef = ref(storage , "images/client/" + sessionStorage.getItem("mail"));
        uploadBytes(imageRef , imageUpload).then(() => {
            console.log("Uploaded");
            setImageUpload(null);
            window.location.reload(false);

        }
        ).catch(err => {
            console.log(err);
        }
        );
    }


    return(
        <div className={props.classname}>
            {personalizar ?
            <div className="image">
            <img className="imagespecific"src={props.src}/>
            </div>
            :
            <div className="personalizeimage">
                <input type="file" className="inputCoso" id="imgupload" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    uploadImage();
                    } } />
                <label for='imgupload'><img className="imagespecific"src={props.src}/></label>
            </div>
            }
        </div>
    )

    }

