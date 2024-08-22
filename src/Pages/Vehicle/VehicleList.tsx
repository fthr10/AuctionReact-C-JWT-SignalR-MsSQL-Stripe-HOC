import React, { useEffect, useState } from 'react';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';
import { Link } from 'react-router-dom';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import Banner from './Banner';



function VehicleList() {
  const {data,isLoading} = useGetVehiclesQuery(null);
  const [vehicles,SetVehicleState] = useState<vehicleModel[]>([])
  
  useEffect(()=>{
    if (data) {      
    console.log(data);
    SetVehicleState(data.result);
  }

  },[data])
  
  return (
    <div className='container'>
      <Banner></Banner>
      <div className='row'>
      {vehicles.map((vehicle, index) => (
        <div className='col' key={index}>
          <div className='auction-card text-center'>
            <div className='card-image'>
              <img src={vehicle.image} alt={`${vehicle.brandAndModel}`} />
            </div>
            <div className='card-details'>
              <h2>{vehicle.brandAndModel}</h2>
              <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
              <p><strong>Current Bid:</strong> {vehicle.price}</p>
              <p><strong>End Time:</strong> {vehicle.endTime}</p>
            </div>
            <div>
              <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
              <button  className='btn btn-danger'>Detail</button>
              </Link>
              </div>
              <Circle vehicle={vehicle}/>
          </div>
        </div>
      ))}

      </div>
    </div>
    
      
    
  );
}

export default VehicleList;
