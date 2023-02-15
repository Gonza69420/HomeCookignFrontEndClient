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
import {useSearchChef} from "../../queries/Filter.tsx";
import toast from "react-hot-toast";

export  const MainPage = () => {
    const[dropdown , setDropdown] = useState("Chef");
    const [searchInput, setSearchInput] = useState('');
    const [clientData , setclientData] = useState([]);
    const [chefData , setchefData] = useState([]);
    const [filteredData ,setfilteredData] = useState([]);
    const [isChefDataEmpty , setisChefDataEmpty] = useState(false);
    const [chefName , setchefName] = useState('');
    const [menuName , setmenuName] = useState('');

    const {first, last , lastPage} = useSearchChef({
        chefName : chefName,
        menuName : menuName,
        onCompleted: (data) => {
            setfilteredData(data)
        },
        onError: (e) => toast.error(e.message),
    })


    useEffect(() => {
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
      setclientData(data);
      sessionStorage.setItem('fullName', data.fullName);

    }).catch(error => {
    })

    }, []);
    
    const searchItems = (e) => {
        if(dropdown === "Chef"){
            setSearchInput(e.target.value);
            setchefName(searchInput);
            setmenuName('');
        }else{
            setSearchInput(e.target.value);
            setmenuName(searchInput);
            setchefName('');
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
            {filteredData.length > 0 &&

            <>
              {filteredData.map(chef => {
                return(
                  <>   
                <ChefCard url={chef.imageURL} firstname={chef.firstName} lastname={chef.lastName} Restaurante="" onClick={() => {window.location.href = `/chefProfile/${chef.id}`}}/>
                </>
                )
              })}
            </>
}
            </Stack>
          </div>
        </div>
    )
        }

