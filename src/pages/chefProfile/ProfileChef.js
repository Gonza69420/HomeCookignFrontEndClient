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
import {CreateSolicitude} from "../../components/CreateSolicitude/CreateSolicitude.tsx";
import toast from "react-hot-toast";
import {GetAvailableDates} from "../../queries/DateQueries.tsx";
import {EventCalendar} from "../../objects/EventCalendar.tsx";

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
    const [createSolicitude, setCreateSolicitude] = useState(false);

    useEffect(() => {
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
            setchefData(JSON.parse(result));
        })
        .catch(error => toast.error( error.message()));
    }, [])
    
    useEffect (() => {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch(`http://localhost:8080/dbInfo/getMenuByChef/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {

            dataMenu[0]= (JSON.parse(result));
            
            if(dataMenu[0][0].name !== undefined){
                setisDataMenuEmpty(true);
            }
        }
        )
        .catch(error => toast.error( error.message()));
    }, []);

  
    useEffect (() => {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/getRestaurant/" + chefData.mail, requestOptions)
        .then(response => response.text())
        .then(result => {

            restaurantData[0]= (JSON.parse(result));
            
            if(restaurantData[0][0].name !== undefined){
                setRestaurantDataEmpty(true);
            }
        }
        )
        .catch(error => toast.error( error.message()));
    }, [chefData.mail]);

    const createMenuInterface = () => {
        let menuArray = dataMenu;
        let menuInterface = []
        menuArray.map((menu, index) => {
            console.log(menu)
            menu.map((menu, index) => {
                menuInterface.push(
                    {
                        name: menu.name,
                        price: menu.price,
                        imageURL: menu.imageurl,
                        id: menu.id
                    }
                )
            })
        })

        return menuInterface;
    }


    return (
        <div className='backgroundProfileChef'>
            <Navbar/>
            <div className='containerprofileClient'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    <Profileimage classname="imageprofile" src={chefData.imageURL} personalizar={false}/>
                    <h1>{chefData.firstName} {chefData.lastName}  </h1> 
                    <button type="button" class="btn btn-success btn-lg" onClick={()=> {
                        setCreateSolicitude(true)
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
                                <MenuCard url={menu.imageurl} name={menu.name} description={menu.description} shortDescription={menu.shortDescription} menuid={menu.id} eliminar={false} price={menu.price} />
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
            {createSolicitude &&
                <CreateSolicitude idChef={chefData.id} setClose={setCreateSolicitude} open={createSolicitude} chefName={chefData.firstName + " "+ chefData.lastName} menus={createMenuInterface(dataMenu)} imageURL={chefData.imageURL}  chefMail={chefData.mail}/>
            }
        </div>
        )
}