import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import {Profileimage} from '../../components/profileimage';
import { Stack } from 'react-bootstrap';
import {RestaurantCard} from '../../components/RestaurantCard';
import {MenuCard} from '../../components/MenuCard';
import "./clientProfile.css"
import { TbPencil, TbCheck } from "react-icons/tb";
import { storage } from '../../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export const ClientProfile = () => {
    const [personalizar , setPersonalizar] = useState(false);
    const [imageurl, setImageUrl] = useState();
    const [data, setData] = useState({
        bio: "Empty Bio",
        firstName: "",
        lastName: "",
        id:"",
        imageURL: ""
    });

    
    const storage = getStorage();

    const imageRef = ref(storage , "images/client/" + sessionStorage.getItem("mail") );


    const handlePersonalizar = () => {
        setPersonalizar(!personalizar);
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    

    const isbio = () => {
        if(data.bio === ""){
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
        
        getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
                setImageUrl("https://firebasestorage.googleapis.com/v0/b/homecooking-346302.appspot.com/o/images%2Fblank.jpg?alt=media&token=ee277b5c-bd58-4f5d-b4aa-cb90f9adf0d2");
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
    }, [])

    const updateClientbio = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        bio: data.bio,
        imageurl: ""
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8080/api/auth/editClientBio/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
      

      var requestOptions = {
        method: 'GET',
        
        redirect: 'follow'
      };
      
      fetch("http://localhost:8080/api/auth/getClientProfile/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => {
        
          setData(JSON.parse(result));
          console.log(data);
        })
        .catch(error => console.log('error', error));

    }, [])

    return(
        <div className='backgroundblack'>
            <Navbar/>
            <div className="container mt-5 bg-white">
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                {personalizar && 
                    <Profileimage classname="imageprofile" src={data.imageURL} personalizar={true}/> 
                    }
                    {!personalizar &&
                    <Profileimage classname="imageprofile" src={data.imageURL} personalizar={false}/>
                    }
                    <h1>{data.firstName} {data.lastName} </h1>
                    <button type="button" onClick={handlePersonalizar} className="btn btn-secondary btn-lg">
                        <TbPencil/> 
                    </button>
                </Stack>
                
                {isbio &&
                <h2 className='d-flex justify-content-start mt-4 '>Bio</h2>
                }

                {!personalizar &&
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                <p>
                {data.bio}
                </p>
                </Stack>
                }
                {personalizar &&
                    <form>
                      <textarea className='inputBio' type="text" name="bio" onChange={handleChange}>
                        {data.bio}
                      </textarea>
                      <div className="d-grid gap-2">
                      <button type="button" onClick={updateClientbio} className="btn btn-info btn-lg">
                        <TbCheck/>
                      </button>
                      </div>
                  </form>

                }

            </div>                
        </div>

    )
}