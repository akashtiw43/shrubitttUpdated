import React from "react";
import '../index.css'
import { useState,useEffect } from "react";
import {auth,firestore} from '../FirebaseConfig/firebaseconfigs';
import { collection, addDoc , query , where, getDocs, doc} from "firebase/firestore";
export default function UserProfile(){
    
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
if(loggeduser){
    console.log(loggeduser[0].email);
}
    return(
        <div>
           <div className="userprofile-outcont">
             {loggeduser?<div className="user-profile">
                <h2>Your Account Details</h2>
                <div className="data-row">
                    <span>Name</span>
                    <span>{loggeduser[0].name}</span>
                </div>
                <div className="data-row">
                    <span>Email address</span>
                    <span>{loggeduser[0].email}</span>
                </div>
                <div className="data-row">
                    <span>Mobile Number</span>
                    <span>{loggeduser[0].phone}</span>
                </div>
                <div className="data-row">
                    <span>Address</span>
                    <span>{loggeduser[0].address}</span>
                </div>
             </div>:<div><h1>You Are Logged Out!!!!</h1></div>}
           </div>
        </div>
    )
}