import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetVehicleByIdQuery } from '../../Api/vehicleApi';
import { Loader } from '../../Helper';
import './Styles/VehicleDetail.css'
import BidsDetail from './Bid/BidsDetail';

function VehicleDetail() {

    const { vehicleId } = useParams();
    const {data,isLoading} = useGetVehicleByIdQuery(vehicleId);


    const safeVehicleId =vehicleId || ""
    var highBid = 0;
    

    if (data) {
      const bids = data.result.bids || [];
      const sortedBids = bids.slice().sort((a: any, b: any) => (a.bidAmount || 0) - (b.bidAmount || 0));
      const highestBid = sortedBids.length > 0 ? sortedBids[sortedBids.length - 1].bidAmount : 0;
      highBid = highestBid;
    }

    

  
    if (!data){
        return(
            <Loader></Loader>
        )
        

    }

  return (
    <>
    <div className="auction-item text-center">
        <img className="container" src={data.result.image}></img>
        <h2>Brand-Model : {data.result.brandAndModel}</h2>
        <p>Description : {data.result.additionalInformation}</p>
        <p>Current Bid: {highBid}</p>
    </div>
    <BidsDetail vehicleId={safeVehicleId}></BidsDetail>

    </>
  )
}

export default VehicleDetail
