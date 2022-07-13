import React, { useEffect, useState } from "react";
import "./profileimage.css"
import { storage } from "../firebase";
import { ref , uploadBytes, getDownloadURL} from "firebase/storage";
export const Profileimage = props => {
    const [personalizar , setPersonalizar] = useState(!props.personalizar);
    const [imageUpload , setImageUpload] = useState(null);
    const [imageRef , setImageRef] = useState("");
    const [image , setImage] = useState("");

    const uploadImage = () => {
        console.log(sessionStorage.getItem("mail"));
        if(imageUpload === null) return;
        console.log("image is not null");
        const imageRef = ref(storage , "images/chef/" + sessionStorage.getItem("mail"));
        uploadBytes(imageRef , imageUpload).then(() => {
            console.log("Uploaded");
            setImageRef(imageRef);
        }
        ).catch(err => {
            console.log(err);
        }
        );

    }

    useEffect(() => {
        if(imageUpload === null) return;
        uploadImage();
        if(imageRef === "") return;
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

        fetch("http://localhost:8080/api/auth/editChefImage/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => {
            setImageUpload(null);
           
            window.location.reload();

        }
        )
        .catch(error => console.log('error', error));

    }, [image , imageRef, imageUpload])


    const getURL = (imageRef) => {
        console.log(imageRef);
        getDownloadURL(imageRef)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
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
                   
                   
                    } } />
                <label className="label" for='imgupload'><img className="imagespecific"src={props.src}/></label>
            </div>
            }
        </div>
    )

    }
