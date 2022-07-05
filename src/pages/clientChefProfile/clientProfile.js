import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import {Profileimage} from '../../components/profileimage';
import { Stack } from 'react-bootstrap';
import {RestaurantCard} from '../../components/RestaurantCard';
import {MenuCard} from '../../components/MenuCard';
import "./clientProfile.css"
import { TbPencil } from "react-icons/tb";


export const ClientProfile = () => {
    const [personalizar , setPersonalizar] = useState(false);
    const [data, setData] = useState({
        bio: "Empty Bio",
        firstName: "",
        lastName: ""
    });


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

    return(
        <div className='backgroundblack'>
            <Navbar/>
            <div className="container mt-5 bg-white">
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                {personalizar && 
                    <Profileimage classname="imageprofile" src="https://dalstrong.com/s/files/1/1728/9189/files/Guga-Dalstrong_1024x1024.jpg?v=1608322553&em-origin=cdn.shopify.com" personalizar={true}/> 
                    }
                    {!personalizar &&
                    <Profileimage classname="imageprofile" src="https://dalstrong.com/s/files/1/1728/9189/files/Guga-Dalstrong_1024x1024.jpg?v=1608322553&em-origin=cdn.shopify.com" personalizar={false}/>
                    }                    <h1>Guga Foods </h1>
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
                  </form>

                }

            </div>                
        </div>

    )
}