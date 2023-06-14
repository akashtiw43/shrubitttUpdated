import React, { useState,useEffect } from 'react';
import {auth,firestore,db} from '../FirebaseConfig/firebaseconfigs'
import { collection,getDocs, query, where } from 'firebase/firestore';
import CartCard from './CartCard'
import StripeCheckout from 'react-stripe-checkout'

export default function Cart(){
    function GetCurrentUser(){
        const[user,setUser]=useState('');
       
        const userCollectionRef = collection(firestore,"users")
        useEffect(()=>{
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                    const getUsers = async()=>{
                        const q = query(userCollectionRef,where("uid","==",userlogged.uid));
                        // console.log(q);
                        const d = await getDocs(q);
                        setUser(d.docs.map((doc)=>({...doc.data(),id:doc.id})))
                    }
                    getUsers();
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }
    const loggeduser = GetCurrentUser();

    const[cartdata,setcartdata] = useState([]);
    if(loggeduser){
      const getcartdata = async()=>{
        const cartArray = [];
        const path = `cart-${loggeduser[0].uid}`
        // console.log(path)
        getDocs(collection(firestore,path)).then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            cartArray.push({...doc.data(),id:doc.id})
            // console.log(doc.id,"=>",doc.data())
          });
          setcartdata(cartArray)
     
        }).catch((error)=>{alert(error.message)})
      }
     getcartdata();
    }
    const cartitem=cartdata.map(item=>{
        return(
            <CartCard key={item.id} item={item} userid={loggeduser[0].uid}/>
        )
      })
    //   console.log((cartitem[0].props.item.quantity)*(cartitem[0].props.item.product.price))
    const totalprice = cartitem.reduce((total,currentValue)=>total=total+(currentValue.props.item.quantity*currentValue.props.item.product.price),0);
    // console.log(totalprice)
     
   const handletoken=(token)=>{
    console.log(token)
   }
    return(
        
        <>
         {cartdata.length!=0?<div>
            <div className='cart-head'><h1>Your Cart Item</h1></div>
            <div className='allcartitem'>
                {cartitem}
               
            </div>
            <div className='totalprice'>
                <h3>Total Price:</h3>
                <span className='tp'>Rs. {totalprice}</span>
            </div>
            {/* <div className='proceed' onClick={displaycheckout}><button>Proceed</button></div> */}
            <div className='proceed' >
            <StripeCheckout
                token={handletoken}
                stripeKey='pk_test_51N9HvqSDku7gnpYe1dAnE0O8aWLeBXKYaKHEeWSOAu6pOntr4c7Eiv9XFDm53cbSU0PSdL2G4M3rJHXDtiDRJlDW00f2SVi33B'
                billingAddress
                shippingAddress
                name="All Products"
                amount={totalprice*100}
            />
            </div>
            
         </div>:<div>Your cart is empty!!</div>}
        </>
    )
}