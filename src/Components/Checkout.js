import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
export default function Checkout(){
    const onToken = (token)=>{
        console.log(token);
    }
    return(
        <div className='checkout'>
            <StripeCheckout
                token={this.onToken}
                stripeKey='pk_test_51N9HvqSDku7gnpYe1dAnE0O8aWLeBXKYaKHEeWSOAu6pOntr4c7Eiv9XFDm53cbSU0PSdL2G4M3rJHXDtiDRJlDW00f2SVi33B'
            />
        </div>
    )
}