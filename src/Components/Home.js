import React, { useEffect, useState } from 'react'
import Main from '../Components/Main';
import About from '../Components/About';
import Contact from '../Components/Contact'
import Banner from '../Components/Banner'
import {auth,db,firestore} from '../FirebaseConfig/firebaseconfigs';
import { collection, addDoc , query , where, getDocs, doc} from "firebase/firestore";
import Gototop from '../Components/Gototop'

export default function Home(){
    const serv = [
        {
            id:1,
            src:"plant2.webp",
            name:"Outdoor Plants"
        },
        {
            id:2,
            src:"IndoorPlants.jpg",
            name:"Indoor Plants"
        },
        {
            id:3,
            src:"Pots.webp",
            name:"Pots"
        },
        {
            id:4,
            src:"q4.webp",
            name:"Tools and Accessories"
        }
    ]
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
        console.log(loggeduser[0]);
    }
    return(
        <>
            <Main/>
            {/* <p>{loggeduser?loggeduser[0].email:"no data"}</p> */}
            <Banner title="Services" data={serv}/>
            <About/>
            <Contact/>
            {/* <Gototop/> */}
        </>
    )
}