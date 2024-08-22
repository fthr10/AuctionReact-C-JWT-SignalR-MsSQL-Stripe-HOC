import React from 'react';
import './App.css';
import { VehicleList } from '../Pages/Vehicle';
import { Header } from '../Layout';
import { Route, Routes } from 'react-router-dom';
import VehicleDetail from '../Pages/Vehicle/VehicleDetail';
import Register from '../Pages/Vehicle/Account/Register';

function App() {
  return (
  <div className="App">
    <Header></Header>
   <div className='pb-5'>
    <Routes>
      <Route path='/' element={<VehicleList></VehicleList>}></Route>
      <Route path='Vehicle/VehicleId/:vehicleId' element= {<VehicleDetail></VehicleDetail>}></Route>
      <Route path='Register' element={<Register></Register>}></Route>
    </Routes>
   </div>
  </div>
  );
}

export default App;
