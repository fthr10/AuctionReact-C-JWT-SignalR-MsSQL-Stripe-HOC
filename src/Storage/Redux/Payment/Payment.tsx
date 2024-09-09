import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Loader } from '../../../Helper';
import { loadStripe } from '@stripe/stripe-js';
import BidCheckout from '../../../Pages/Vehicle/Bid/BidCheckout';
import CheckoutForm from './CheckoutForm';
import { Modal } from 'react-bootstrap';

function Payment() {

    const location= useLocation();
    const {apiResult,userStore} = location.state
    const [show,setShow] = useState(true);


    const stripePromise = loadStripe ("pk_test_51Pnsm606ifDjXHsgTgKGoXT94wWj3Rx0rHp0ZAYyFO9Fi1jaBEzNwE3UUPJ8Rs6X1U0hooRgyi9BQXrrUlWAnT9Z00MI2GeUUj")


    if (apiResult) {
        const options={
            clientSecret:apiResult.clientSecret
        }
    

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <div className="container m5 p-5">
            <div className="row">
            <Modal show={show} >
                <div className="container">
                    <CheckoutForm></CheckoutForm>
                </div>
                </Modal>
            </div>
            
        </div>
      </Elements>
    </div>
  )
    }

    else{
        return(
            <Loader></Loader>
        )
    }


}

export default Payment
