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
    
    const {id} = useParams();

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
    

  

  
    return (
        <div className='bg-dark'>
            <Navbar/>
            <div className='container mt-5 bg-white'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    <Profileimage classname="imageprofile" src={chefData.imageURL} personalizar={false}/>
                    <h1>{chefData.firstName} {chefData.lastName}  </h1> 
                    <button type="button" class="btn btn-success btn-lg">Contratar</button>
                </Stack>


                <h2 className='d-flex justify-content-start mt-4 '>Bio</h2>
                <p>{chefData.bio}</p>
                <br/>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Restaurantes</h2>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                    {chefData.restaurants.map(restaurant => {
                        return(
                            <RestaurantCard url="https://media-cdn.tripadvisor.com/media/photo-s/05/ae/df/ab/1000-rosa-negra.jpg" name="1000 Rosa Negra"  />

                        )
                    })}
                </Stack>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Menus</h2>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                    {chefData.menus.map(menu => {
                        <MenuCard url="https://assets.unileversolutions.com/recipes-v2/218401.jpg" name="Hamburguesa completa" description="Plato elaborado con tira de asado 80-20" onClick={() => setmenuPopUp(true)}/>


                        {menuPopUp &&
                            <>
                                <Popup setTrigger={setmenuPopUp} trigger={menuPopUp} type="popup-inner">
                                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                <h1 className="topright">Hamburguesa Completa</h1>
                                <img className ="MenuImage" src='https://assets.unileversolutions.com/recipes-v2/218401.jpg'/>
                                </Stack>
                                <h3 className='d-flex justify-content-start mt-4 mb-4'>Descripcion:</h3>
                                <p className='totheright'>Una hamburguesa es un sándwich hecho a base de carne molida o de origen vegetal,1 aglutinada en forma de filete cocinado a la parrilla o a la plancha, aunque también puede freírse u hornearse. Fuera del ámbito de habla hispana, es más común encontrar la denominación estadounidense burger, acortamiento de hamburger. Se presenta en un pan ligero partido en dos que posee forma de óvalo. Suele estar acompañada de aros de cebolla, hojas de lechuga, alguna rodaja de tomate, láminas de encurtidos y papas fritas. Se suele aliñar con algún condimento, como puede ser la salsa de tomate (o kétchup), la mostaza, el relish, o la mayonesa, entre otros.2 En el caso de que se ponga una lámina de queso procesado, se convierte en una hamburguesa con queso (cheeseburger),3 denominada a veces hamburguesa amarilla. La invención del bocadillo de hamburguesa en el siglo XIX es polémica, ya que diversos autores se atribuyen haber sido los primeros en haber puesto un filete de carne molida (hamburger steak) entre dos panecillos.4 La hamburguesa creció durante el siglo XX junto a la aparición del concepto comida rápida y durante ese siglo fue adquiriendo un simbolismo especial. Forma parte de uno de los alimentos icono de la cocina estadounidense (junto al pollo frito y la tarta de manzana). La primera cadena de restaurantes que puso en circulación la hamburguesa como comida rápida fue White Castle en la década de 1920 (cuyo ideólogo fue Edgar Waldo "Billy" Ingram),5 y posteriormente durante la década de 1940 con McDonald's (asumida por el ejecutivo Ray Kroc),6 así como Burger King. La hamburguesa es, en la actualidad, un alimento tan popular que aparece con sus diversas variantes en casi todas las culturas, al igual que otros alimentos, como pueden ser la pizza, el perro caliente y los tacos.</p>
                                <br/>
        
                                <h3 className='d-flex justify-content-start mt-4 mb-4'>Ingredientes:</h3>
                                <ul className='totheright'>
                                    <li className='fontbigger'>Pan</li>
                                    <li className='fontbigger'>Queso</li>
                                    <li className='fontbigger'>Carne</li>
                                    <li className='fontbigger'>Pan</li>
                                </ul>
                                
                                <br/>
        
                                <h3 className='d-flex justify-content-start mt-4 mb-4'>Reviews:</h3>
                                <ReviewCard firstname="Raul" lastname="Salvio" review="Interesante el concepto. Mercado Libre es una herramienta" src="https://pbs.twimg.com/media/BcFrAwtIYAAsqsE.jpg" stars={3}/>
                                <ReviewCard firstname="Raul" lastname="Salvio" review="Interesante el concepto. Mercado Libre es una herramienta" src="https://pbs.twimg.com/media/BcFrAwtIYAAsqsE.jpg" stars={3}/>
        
                                </Popup>
                            </>
                            }
        
                    })}

                    

                </Stack>
                <br/>
            </div>
            <br/>
        </div>
        )
}