import React, { Component, useEffect, useState } from 'react'
import {MenuItems} from './MenuItems';
import './Navbar.css';
import { Button } from './Button';
import {Bell} from "./Notifications/Bell.tsx";


const Navbar = ()=> {
  

  const logOutClick = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

    return (
      <nav className='NavbarItems'>
          <h1 className='navbar-logo'>HomeCooking<i className='fab '></i></h1>
          
          <ul className='nav-menu'>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>

          <Bell/>

          <Button className="logoutButton" style={{ color: 'white' }} onClick={logOutClick}>Log Out</Button>
      </nav>
    )
  }
  


export default Navbar

