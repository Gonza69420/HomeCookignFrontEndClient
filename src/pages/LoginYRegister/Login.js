import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../../assets/login-hc.png";

export const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if (sessionStorage.getItem('token') !== null) {
            // window.location.href = '/mainPage';
        }
    }, [])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/auth/signin", {
            mail: data.username,
            password: data.password,
            role: "ROLE_CLIENT"

        }).then(res => {
            if (res.status === 401 || res.status === 400 || data.username === '' || data.password === '') {
                toast.error('Invalid Credentials');
            }
            else {
                toast.success('Login Successful');
                sessionStorage.setItem("mail", data.username);
                sessionStorage.setItem('token', res.data.accessToken);
                sessionStorage.setItem('id', res.data.id);
                navigate('/mainPage');

            }
        }).catch(err => {
            console.log(err)
            toast(err.message)
        })



    }


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = () => {
        window.location.href = '/register';
    }

    return (
        <div className="containerLogin">
            <div className="loginSplitScreen">
                <div className="loginScreenLeft" style={{ backgroundColor: '#FF6D2D', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="loginScreenRight">
                    <div className="containerLoginForm">
                        <div className="containerLoginCenter">
                            <h1 style={{ fontWeight: 'bold' }}>HomeCooking | Login</h1>
                            <div className="formLogin">
                                <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput0">
                                    <Form.Label className="labelForm" style={{ textAlign: 'left' }}>Username</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username" />
                                </Form.Group>
                                <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="labelForm" style={{ textAlign: 'left' }}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password" />
                                </Form.Group>

                                <Button variant="contained" className="LogInButtonChef" style={{ padding: "20", margin: "10px",backgroundColor: '#FF6D2D', color: '#fff' }} onClick={(e) => onSubmit(e)}>
                                    Log In
                                </Button>

                                <Button variant="contained" className="LogInButtonChef" style={{ margin: "10px",backgroundColor: '#ffc49b', color: 'white', }} onClick={handleRegister}>
                                    Register
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

