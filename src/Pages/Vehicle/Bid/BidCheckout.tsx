import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useGetVehicleByIdQuery } from '../../../Api/vehicleApi';
import userModel from '../../../Interfaces/userModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Storage/store';
import { useDoPaymentMutation } from '../../../Api/paymentApi';
import "./Styles/bidCheckout.css";
import { Loader } from '../../../Helper';
import { apiResponse } from '../../../Interfaces/apiResponse';
import { UseDispatch } from 'react-redux';
import { getOrderInfo } from '../../../Storage/Redux/orderSlice';
import { getVehicle } from '../../../Storage/Redux/VehicleSlice';
import { useNavigate } from 'react-router-dom';


function BidCheckout() {

    const {vehicleId} = useParams();
    const { data, isLoading} = useGetVehicleByIdQuery(vehicleId);
    const userStore: userModel = useSelector((state:RootState) => state.authenticationStore);
    const [initialPayment] = useDoPaymentMutation();
    const Dispatch = useDispatch();
    const Navigate=useNavigate();
    


    const initalState ={
      name:userStore.fullName,
      email:userStore.email,
      phoneNumber:""
    }

    const [phone,setPhoneState] = useState(initalState.phoneNumber);
    const [name,setNameState] = useState(initalState.name);
    const [email,setEmailState] = useState(initalState.email);
    const [loading,setLoadingState] = useState<boolean>();


    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setLoadingState(true);


      const {data} : apiResponse = await initialPayment({
        userId:userStore.nameid,
        vehicleId:vehicleId
      })

      if (data){
          Dispatch(getOrderInfo({
            vehicleId: data?.result.vehicleId,
            userId:data?.result.userId,
            clientSecret:data?.result.clientSecret,
            stripePaymentIntentId:data?.result.stripePaymentIntentId,

          }))
          
          console.log("77");
          console.log(vehicleId);

          const orderSummary=data
          Dispatch(getVehicle(vehicleId))
          Navigate("/payment",{
            state:{apiResult:data?.result,userStore}
          });


      console.log(data);


      setLoadingState(false);

    }
    }
    
    if(data) {
      return (
        <div className="container">
          <div className="card-text-center">
            <form onSubmit={handleSubmit}>
              <img src={data.result.image} className="card-image"></img>
                <div className="card-content-text-center">
                  <h3 className="card-title"> {data.result.brandAndModel}</h3>
                  <p className="card-text"><span className="text-black bold"> ${data.result.auctionPrice}</span></p>
                </div>
                <div className='container'>
                  <div className="form-group mt-3">
                    <span className="text-black"> <strong> Name </strong></span>
                    <input className="form-control" type="text" placeholder="Default input" defaultValue={name} onChange={(e)=> setNameState(e.target.value)} aria-label="default input example"></input>
                  </div>
                  <div className="form-group mt-3">
                    <span className="text-black"> <strong> Email </strong></span>
                    <input className="form-control" type="text" placeholder="Default input" defaultValue={email} onChange={(e)=> setEmailState(e.target.value)} aria-label="default input example"></input>
                  </div>
                  <div className="form-group mt-3">
                    <span className="text-black"> <strong> Phone Number </strong></span>
                    <input className="form-control" type="text" placeholder="Default input" defaultValue={phone} onChange={(e)=> setPhoneState(e.target.value)} aria-label="default input example"></input>
                  </div>
                  
                </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-lg btn-success from-control mt-3">
                        {
                          loading?(<Loader></Loader>): " Pay Auction Price "
                        }
                        
                        </button>
    
                    </div>
            </form>
          </div>
                
        </div>
      )
    }
    else {
      return(
        <Loader></Loader>
      )
    }

  }


export default BidCheckout
