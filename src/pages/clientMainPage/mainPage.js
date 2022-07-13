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
    const [searchInput, setSearchInput] = useState('');
    const [clientData , setclientData] = useState([]);
    const [chefData , setchefData] = useState([]);
    const [filteredData ,setfilteredData] = useState([]);
    const [isChefDataEmpty , setisChefDataEmpty] = useState(false);

   
    useEffect(() => {
        console.log(sessionStorage.getItem('token'));
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    useEffect(() => {
      console.log("3")
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
      sessionStorage.setItem('fullName', data.fullName);

    }).catch(error => {
      console.log(error);
    })

    console.log("4")
    }, []);
    
    

    const searchItems = (event) => {
      setSearchInput(event.target.value);

      console.log(dropdown)
      if(dropdown === "Menu"){

      }

      if(dropdown === "Chef"){
          
      }
    }

    const handleSelect = (e) => {
      console.log(e);
      setDropdown(e);
    }

    useEffect(() => {
      var raw = "";

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:8080/api/auth/getAllAvailableChefProfile", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(JSON.parse(result));
          chefData[0] = JSON.parse(result);
          console.log(chefData);

          if(chefData[0][0].id !== undefined){
            setisChefDataEmpty(true);
          }
        })
        .catch(error => console.log('error', error));
    }, [])

    return(
        <div>
          <Navbar/>
          <div className='container-fluid mt-5'>  
            <div className="containerTittles">
              <h1 className='Tittles'>Welcome {clientData?.clientProfile?.firstName} {clientData?.clientProfile?.lastName}!</h1>
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
            {isChefDataEmpty &&
            <>
              {chefData[0].map(chef => {
                return(
                <ChefCard url={chef.imageURL} firstname={chef.firstName} lastname={chef.lastName} stars="5" Restaurante="" onClick={() => {window.location.href = `/chefProfile/${chef.id}`}}/>
                )
              })}
            </>
          }
            </Stack>
          </div>
        </div>
    )
}
