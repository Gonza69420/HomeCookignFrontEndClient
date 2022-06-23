import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { Register } from './pages/LoginYRegister/Register';
import { Login } from './pages/LoginYRegister/Login';
import { MainPage } from './pages/clientMainPage/mainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/mainPage" element= {<MainPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
