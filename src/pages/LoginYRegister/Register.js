import {useRef , useState, useEffect, Fragment} from "react"
import React from 'react'
import {Form, Button, Container } from 'react-bootstrap'
import "./Login.css";


export const Register = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        dni: ''

    })

    useEffect(() => {
        if(sessionStorage.getItem('token') !== null){
          console.log(sessionStorage.getItem('token'));
            window.location.href = '/mainPage';
        }
    }, [])
    
    const onSubmit = (e) => {
        console.log(data);
            fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                email: data.username,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phone,
                address: data.address,
                dni: data.dni,
                role: "ROLE_CLIENT"
            })
             })
            .then(res => res.json())
         .then(data => {
                console.log(data);
                window.location.href = '/';
          }
           )
            .catch(err => console.log(err));
        e.preventDefault();
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="containerLogin">
            <div className={"containerRegisterLogin"}>
                <h1 className={"registerTittle"}>Register</h1>
                <br/>
                <Form id="sign in-form" action="" onSubmit={onSubmit} className = "text-center w-100">
                 <Form.Group className="registerFields" controlId="exampleForm.ControlInput0">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username"/>
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput1" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name="confirmPassword" />
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name ="lastName" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput5">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone Number" name= "phone"onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput6">
                    <Form.Label>Adress</Form.Label>
                    <Form.Control type="text" placeholder="Adress" name="address" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="registerFields" controlId="exampleForm.ControlInput7">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" placeholder="DNI" name="dni" onChange={handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit" className={"buttonSubmitRegister"}>
                    Submit
                </Button>

                </Form>
            </div>
        </div>
  )
}
