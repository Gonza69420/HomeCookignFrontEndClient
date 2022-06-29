import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import {Stars} from '../../components/Stars';
import { RiStarSFill , RiStarSLine } from "react-icons/ri";
import { ChefCard } from '../../components/ChefCard';
import { Stack } from 'react-bootstrap';
export  const MainPage = () => {
   const [data , setData] = useState();


  /*
    useEffect(() => {
        console.log(sessionStorage.getItem('token').toString());
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    useEffect(() => {
        fetch("")
      .then(response => response.json())
      .then(data => {
        //setData(data)
      })
    }, [])
    */

    

    return(
        <div>
          <Navbar/>
          <div className='container-fluid mt-5'>           
            <h1>MainPage</h1>
            <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
              <ChefCard url="https://dcom-prod.imgix.net/files/2020-07/CHEF%20DONATO%20DE%20SANTIS_PORTADA.jpg?w=1920&h=1440&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75" name="Donato De Santi" Restaurante="Restaurante Italiano Generico" stars={1}/>
            </Stack>
          </div>
        </div>
    )
}
