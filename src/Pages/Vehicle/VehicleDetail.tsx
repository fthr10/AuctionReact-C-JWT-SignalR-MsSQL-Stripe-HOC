import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetVehicleByIdQuery } from '../../Api/vehicleApi';
import { Loader } from '../../Helper';
import './Styles/VehicleDetail.css'


function VehicleDetail() {

    const { vehicleId } = useParams();
    const {data,isLoading} = useGetVehicleByIdQuery(vehicleId);
    if (!data){
        return(
            <Loader></Loader>
        )
        

    }

  return (
    <div className='auction-item text-center'>
        <img className='container' src={data.result.image}></img>
        <h2>Brand-Model : {data.result.brandAndModel}</h2>
        <p>Description : {data.result.additionalInformation
        }</p>
        <p>Current Bid:</p>
        <p>Last Bidder:</p>
       
    </div>
  )
}

export default VehicleDetail
