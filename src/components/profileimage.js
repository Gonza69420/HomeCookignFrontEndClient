import React, { useEffect, useState } from "react";
import "./profileimage.css"
import { storage } from "../firebase";
import { ref , uploadBytes, getDownloadURL} from "firebase/storage";

export const Profileimage = props => {
    const [personalizar , setPersonalizar] = useState(!props.personalizar);
    const [imageUpload , setImageUpload] = useState(null);
    const [image , setImage] = useState("");
    const uploadImage = () => {
        console.log(sessionStorage.getItem("token"));

        console.log(sessionStorage.getItem("mail"));
        if(imageUpload === null) return;
        const imageRef = ref(storage , "images/client/" + sessionStorage.getItem("mail"));
        uploadBytes(imageRef , imageUpload).then(() => {
            console.log("Uploaded");
            setImageUpload(null);
            setClientImage(imageRef);
        }
        ).catch(err => {
            console.log(err);
        }
        );


    }


    const setClientImage = (imageRef) => {
        getURL(imageRef)
        console.log(image)
        if(image === "") return;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        imageurl: image,
        bio: ""
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/editClientImage/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            window.location.reload(false);

        }
        )
        .catch(error => console.log('error', error));
    }

    const getURL = (imageRef) => {
        console.log(imageRef)
        getDownloadURL(imageRef)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {

            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });
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
                <label className="label" for='imgupload'><img className="imagespecific"src={props.src}/></label>
            </div>
            }
        </div>
    )

    }

