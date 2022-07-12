import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Buttonn } from '../../components/Button'
import { TbPencil } from "react-icons/tb";
import { Stack, Button, Form } from 'react-bootstrap';
import {MenuCard} from '../../components/MenuCard'
import {Profileimage} from '../../components/profileimage';
import {RestaurantCard} from "../../components/RestaurantCard"
import { Popup } from '../../components/Popup';
import "./ProfileChef.css"
import { ReviewCard } from '../../components/reviewCard';
import { useHistory, useParams } from 'react-router-dom'
export const ProfileChef = () => {
    const [menuPopUp , setmenuPopUp] = useState(false);
    const [dataMenu, setDataMenu] = useState([[{}]]);
    const {id} = useParams();
    const [isDataMenuEmpty, setisDataMenuEmpty] = useState(false);
    const [chefData, setchefData] = useState({});

    useEffect(() => {
        console.log(id);
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

   
    useEffect(() => { //conseguir datos de Perfil

        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/auth/getChefProfileId/${id}` , requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setchefData(JSON.parse(result));
            console.log(chefData)
        })
        .catch(error => console.log('error', error));
    }, [])
    
    useEffect (() => {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch(`http://localhost:8080/dbInfo/getMenuByChef/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result));
            
            dataMenu[0]= (JSON.parse(result));
            
            console.log(dataMenu)
            if(dataMenu[0].name !== undefined){
                setisDataMenuEmpty(true);
            }
        }
        )
        .catch(error => console.log('error', error));
    }, []);

  

  
    return (
        <div className='bg-dark'>
            <Navbar/>
            <div className='container mt-5 bg-white'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    <Profileimage classname="imageprofile" src={chefData.imageURL} personalizar={false}/>
                    <h1>{chefData.firstName} {chefData.lastName}  </h1> 
                    <button type="button" class="btn btn-success btn-lg" onClick={()=> {
                        sessionStorage.setItem("chefmail", chefData.mail);
                        window.location.href = '/chat';
                    }}>Contratar</button>
                </Stack>


                <h2 className='d-flex justify-content-start mt-4 '>Bio</h2>
                <p>{chefData.bio}</p>
                <br/>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Restaurantes</h2>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                            <RestaurantCard url="https://media-cdn.tripadvisor.com/media/photo-s/05/ae/df/ab/1000-rosa-negra.jpg" name="1000 Rosa Negra"  />

                        
                </Stack>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Menus</h2>
                <div className='containercards'>
                <Stack direction="horizontal" className='mt-4' gap={3}>
                    {!isDataMenuEmpty &&
                    <>
                    {dataMenu[0]?.map(menu => {

                        return(
                            <>
                        <MenuCard url={menu.imageurl} name={menu.name} description={menu.shortDescription} onClick={() => setmenuPopUp(true)} />

                        {menuPopUp &&
                            <>
                                <Popup setTrigger={setmenuPopUp} trigger={menuPopUp} type="popup-inner">
                                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                <h1 className="topright">{menu.name}</h1>
                                <img className ="MenuImage" src={menu.imageurl}/>
                                </Stack>
                                <h3 className='d-flex justify-content-start mt-4 mb-4'>Descripcion:</h3>
                                <p className='totheright'>{menu.description}</p>
                                <br/>




                                <h3 className='d-flex justify-content-start mt-4 mb-4'>Reviews:</h3>
                                <ReviewCard firstname="Raul" lastname="Salvio" review="Interesante el concepto. Mercado Libre es una herramienta" src="https://pbs.twimg.com/media/BcFrAwtIYAAsqsE.jpg" stars={3}/>

                                </Popup>
                            </>
                            }
                            </>
                        )
                    })
                    }
                    </>
                    }
                    
                    

                </Stack>
                </div>
                <br/>
            </div>
            <br/>
        </div>
        )
}