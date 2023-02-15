import React, {useState, useEffect} from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./Login.css";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if(sessionStorage.getItem('token') !== null){
          console.log(sessionStorage.getItem('token'));
            window.location.href = '/mainPage';
        }
    }, [])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        console.log(data);
        e.preventDefault();
            (fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail: data.username,
                password: data.password,
                role: "ROLE_CLIENT"
            })
                })
            .then(res =>{
                if (res.status === 401 || res.status === 400 || data.username === '' || data.password === '') {
                    toast.error( 'Invalid Credentials');
                } 
                else {
                    toast.success( 'Login Successful');
                    sessionStorage.setItem("mail" , data.username);
                    sessionStorage.setItem('token', res.accessToken);
                    navigate('/mainPage');

                }
                }
            )).catch(err => console.log(err));
            
       
    }
    

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = () => {
        window.location.href = '/register';
    }

    return(
       <div className={"containerLogin"}>
           <div className={"containerLoginForm"}>
               <div className={"containerLoginCenter"}>
                    <h1>HomeCooking | Login</h1>
                   <div className={"formLogin"}>
                        <Form.Group className={"userNameLogin"} controlId="exampleForm.ControlInput0">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username"/>
                         </Form.Group>
                        <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput1" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
                        </Form.Group>

                        <Button variant={"contained"} className={"LogInButtonChef"} onClick={(e) => onSubmit(e)}>
                            Log In
                        </Button>

                        <Button variant={"contained"} className={"LogInButtonChef"} onClick={handleRegister}>
                            Register
                        </Button>
                   </div>
            </div>
           </div>
       </div>
    )
   
}

