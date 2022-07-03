import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import {Stars} from '../../components/Stars';
import { RiStarSFill , RiStarSLine } from "react-icons/ri";
import { ChefCard } from '../../components/ChefCard';
import { Stack, Dropdown } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./mainPage.css"

export  const MainPage = () => {
   const[dropdown , setDropdown] = useState("Menu");
   const [Data , setData] = useState();
   const [searchInput, setSearchInput] = useState('');


  
    useEffect(() => {
        console.log(sessionStorage.getItem('token').toString());
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/getChefs")
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
    }, [])
    

    const searchItems = (event) => {
      setSearchInput(event.target.value);
      console.log(event.target.value);
    }

    const handleSelect = (e) => {
      console.log(e);
      setDropdown(e);
    }

    return(
        <div>
          <Navbar/>
          <div className='container-fluid mt-5'>           
            <h1>MainPage</h1>
          
            <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
              <div className='fillhorizontal'>
                <DropdownButton
                  title={dropdown}
                  id="dropdown-menu-align-right"
                  onSelect={handleSelect}
                  >
                        <Dropdown.Item eventKey="Menu">Menu</Dropdown.Item>
                        <Dropdown.Item eventKey="Chef">Chef</Dropdown.Item>
                </DropdownButton>
              </div>
              <TextField className="textfieldfill" id="outlined-basic" label="Search..." variant="outlined" onChange={searchItems} value={searchInput}/>
              
            </Stack>
            <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
              {Data.map((item) => (
                <></>
              ))}
              <ChefCard url="https://dcom-prod.imgix.net/files/2020-07/CHEF%20DONATO%20DE%20SANTIS_PORTADA.jpg?w=1920&h=1440&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75" name="Donato De Santi" Restaurante="Restaurante Italiano Generico" stars={1}/>
            </Stack>
          </div>
        </div>
    )
}
