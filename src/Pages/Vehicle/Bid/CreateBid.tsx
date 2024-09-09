import React, { useState } from 'react'
import { useCreateBidMutation } from '../../../Api/bidApi'
import { bidModel } from '../../../Interfaces/bidModel';
import userModel from '../../../Interfaces/userModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Storage/store';
import { setBidChange } from '../../../Storage/Redux/bidSlice';
import { ToastrNotify } from '../../../Helper';


function CreateBid(props:{vehicleId:number}) {

  const [createBid] = useCreateBidMutation();

  const userStore: userModel = useSelector((state:RootState) => state.authenticationStore);
  
  const Dispatch = useDispatch()
  const [bidAmount,setBidAmountState] = useState("");



  const bidModel : bidModel = {
    bidAmount: parseInt(bidAmount),
    userId: userStore.nameid!,
    vehicleId: (props.vehicleId),
    bidDate: '',
    bidStatus: ''
  }


  


  const handleCreateBid =() => {
    createBid(bidModel).then((response:any)=> {
      console.log("bidder")
      console.log(response);
      if (response.data.isSucces === true){
        Dispatch(setBidChange(bidModel.bidAmount));
        ToastrNotify("You are bid register is success", "success");
      }
      if (response.data.isSucces === false){
        ToastrNotify(response.data.errorMessages[0], "error");
      }
    })
    

  }




  return (
    <div className='container'>
        <form>
            <label htmlFor='bidAmount'> Bid Amount : </label>
            <input type='number' className='form-control' id='bidAmount' name='bidAmount' onChange={(e)=>setBidAmountState(e.target.value)}/>
            <div className='text-center'>
                <button type='button' onClick={()=>handleCreateBid()} >Place Bid</button>
            </div>
          </form>
    </div>
  )

}
export default CreateBid
