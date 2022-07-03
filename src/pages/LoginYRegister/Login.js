import React, {useState} from "react";
import { Form, Button, Container } from "react-bootstrap";


export const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })

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
                    throw new Error("Invalid credentials");
                } 
                else {
                    sessionStorage.setItem('token', res.token);
                }
                })
            .then(data => {
                console.log(sessionStorage.getItem('token'));
                window.location.href = '/mainPage';
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
       <div className="container mt-5" align="center">
            <h1>Login Cliente!</h1>
            <Container id= "main-container" className="d-grid h-100 m-auto">
            <Form id="sign in-form" action="" onSubmit={onSubmit} className = "text-center w-100">
             <Form.Group className="mb-3 mt-3 w-25 m-auto " controlId="exampleForm.ControlInput0">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username"/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 position-relative m-auto" controlId="exampleForm.ControlInput1" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
            </Form.Group>

            <Button variant="primary" type="submit" className="primary m-auto mb-3 w-25">
                Submit
            </Button>
            
            </Form>
            <Button variant="secondary" onClick={handleRegister} className="primary m-auto mb-3 w-25 text-center " >
                Register
            </Button>
        </Container>
       </div> 
    )
}

