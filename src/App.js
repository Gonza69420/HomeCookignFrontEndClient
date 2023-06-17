import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { Register } from './pages/LoginYRegister/Register';
import { Login } from './pages/LoginYRegister/Login';
import { MainPage } from './pages/clientMainPage/mainPage';
import { ClientProfile } from './pages/clientChefProfile/clientProfile';
import { ProfileChef } from './pages/chefProfile/ProfileChef';
import {PedidosCliente} from "./pages/pedidos/PedidosCliente"
import { ChatPage } from './pages/chat/ChatPage.tsx';
import {Test} from "./pages/Test.tsx";
import {Test2} from "./pages/Test2.tsx";
import {Toaster} from "react-hot-toast";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/mainPage" element= {<MainPage/>}/>
          <Route path="/profile" element={<ClientProfile/>}/>
          <Route path='/chefProfile/:id' element={<ProfileChef/>}/>
          <Route path='/pedidosCliente' element={<PedidosCliente/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path={'/test2'} element={<Test2/>}/>
        </Routes>
      </Router>
      <Toaster
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            position: 'bottom-center',
            style: {
              width: '20vw',
              height: '5vh',
              fontSize: '20px'
            },
            success: {
              style: {
                background: '#B4EBCA'
              }
            },
            error: {
              style: {
                background: '#FFB7C3'
              }
            }
          }}
      />
    </div>
  );
}

export default App;
