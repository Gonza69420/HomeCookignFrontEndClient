import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

export  const MainPage = () => {
   const [data , setData] = useState();



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
    
    return(
        <div>
          <Navbar/>
           <h1>MainPage</h1>      
        </div>
    )
}
