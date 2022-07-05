import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { Register } from './pages/LoginYRegister/Register';
import { Login } from './pages/LoginYRegister/Login';
import { MainPage } from './pages/clientMainPage/mainPage';
import { ClientProfile } from './pages/clientChefProfile/clientProfile';
import { ProfileChef } from './pages/chefProfile/ProfileChef';
import {PedidosCliente} from "./pages/pedidos/PedidosCliente"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/mainPage" element= {<MainPage/>}/>
          <Route path="/profile" element={<ClientProfile/>}/>
          <Route path='/chefProfile' element={<ProfileChef/>}/>
          <Route path='/pedidosCliente' element={<PedidosCliente/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
