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
    const [dataMenu, setDataMenu] = useState([{}]);
    const {id} = useParams();
    const [isDataMenuEmpty, setisDataMenuEmpty] = useState(false);
    const [chefData, setchefData] = useState({});
    const[ menu, setMenu] = useState({
        name: "",
        shortDescription: "",
        description: "",
        category: "",
        imageurl: ""
    });
    const [restaurantData, setRestaurantData] = useState([{}]);
    const [isRestaurantDataEmpty, setRestaurantDataEmpty] = useState(false);


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
            if(dataMenu[0][0].name !== undefined){
                setisDataMenuEmpty(true);
            }
        }
        )
        .catch(error => console.log('error', error));
    }, []);

  
    useEffect (() => {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/getRestaurant/" + chefData.mail, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result));
            
            restaurantData[0]= (JSON.parse(result));
            
            console.log(restaurantData)
            if(restaurantData[0][0].name !== undefined){
                setRestaurantDataEmpty(true);
                console.log(isRestaurantDataEmpty)
            }
        }
        )
        .catch(error => console.log('error', error));
    }, [chefData.mail]);


  
    return (
        <div className='bg-dark'>
            <Navbar/>
            <div className='container mt-5 bg-white'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    <Profileimage classname="imageprofile" src={chefData.imageURL} personalizar={false}/>
                    <h1>{chefData.firstName} {chefData.lastName}  </h1> 
                    <button type="button" class="btn btn-success btn-lg" onClick={()=> {
                        sessionStorage.setItem("chefmail", chefData.mail);
                        sessionStorage.setItem('fullNameChef', chefData.firstName + " " + chefData.lastName);

                        window.location.href = '/chat';

                    }}>Contratar</button>
                </Stack>


                <h2 className='d-flex justify-content-start mt-4 '>Bio</h2>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                <p className='totheright'>{chefData.bio}</p>
                </Stack>
                <br/>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Restaurantes</h2>
                <div className='containercards'>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                    {isRestaurantDataEmpty &&
                    <>
                        {restaurantData[0]?.map((restaurant, index) => {
                            return(
                                <>
                                <RestaurantCard url={restaurant.imageURL} name={restaurant.name}  />    
                                </>
                            )

                        }
                        )}
                    </>
                    }      
                </Stack>
                </div>

                <h2 className='d-flex justify-content-start mt-4 mb-4'> Menus</h2>
                <div className='containercards'>
                <Stack direction="horizontal" className='mt-4' gap={3}>
                    {isDataMenuEmpty &&
                    <>
                    {dataMenu[0]?.map(menu => {

                        return(
                            <>
                                <MenuCard url={menu.imageurl} name={menu.name} description={menu.shortDescription} menuid={menu.id} eliminar={false} />
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