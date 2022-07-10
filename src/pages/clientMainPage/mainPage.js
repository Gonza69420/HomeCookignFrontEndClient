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
    const [clientData , setclientData] = useState([]);

    const redirigirPerfilChef = () =>{
      window.location.href = '/chefProfile';
    }
  
    useEffect(() => {
        console.log(sessionStorage.getItem('token'));
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    useEffect(() => {
      fetch(`http://localhost:8080/api/auth/getClient/${sessionStorage.getItem('mail')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${sessionStorage.getItem('token')}`
        }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      setclientData(data);
    }).catch(error => {
      console.log(error);
    })
    },[]);
    
    

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
            <div className="containerTittles">
              <h1 className='Tittles'>Welcome {clientData.firstName} {clientData.lastName}!</h1>
            </div>
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
             
            </Stack>
          </div>
        </div>
    )
}
