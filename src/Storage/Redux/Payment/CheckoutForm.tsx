import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useCreatePaymentHistoryMutation } from '../../../Api/paymentHistoryApi';
import orderModel from '../../../Interfaces/orderModel';



function CheckoutForm() {


    const Navigate= useNavigate();
 const stripe = useStripe();
  const elements = useElements();
  const [isProcessing,setIsProcessing] = useState(false);
  const [createPaymentHistory] = useCreatePaymentHistoryMutation();
  const vehicleId : string = useSelector((state:RootState) => state.vehicleStore.vehicleId)
  const orderStore : orderModel = useSelector((state:RootState) => state.orderStore)
  console.log("vehicleId");
  console.log(vehicleId);
  console.log("vehicleId");


  const handleSubmit = async (event:React.ChangeEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect:"if_required"
    });
        console.log(result);
    if (result.error) {
      setIsProcessing(false);
    }   

    if (result.paymentIntent?.status === "succeeded"){

        const response = createPaymentHistory({
            clientSecret:orderStore.clientSecret,
            stripePaymentIntentId:orderStore.stripePaymentIntentId,
            userId:orderStore.userId,
            vehicleId:orderStore.vehicleId
            
            
            
        })

        console.log(response);

        Navigate(`/Vehicle/VehicleId/${vehicleId}`)
    }


    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="text-center mt-2">
      <button disabled={!stripe || isProcessing} type='submit' className="btn btn-primary">
    {
        isProcessing ? "Processing...":"Submit Pay"
    }</button>
      

      </div>
    </form>
  )
}

export default CheckoutForm
