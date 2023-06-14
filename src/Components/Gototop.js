import React, { useEffect, useState } from "react";
import { FaArrowUp } from 'react-icons/fa';
import styled from "styled-components";

export default function Gototop(){
    const [showscroll ,setshowscroll]= useState(false);
    const Wrapper = styled.section`
      
        display:flex;
        justify-content:flex-end;
        align-items:center;
        margin-left:2rem;

      .arrowcircleup{
        font-size:2.5rem;
        background-color:blue;
        color:white;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:0.5rem;

      }
    `;
    const gotop = ()=>{
        window.scrollTo({top:0,left:0,behaviour:"smooth"});
    }
    const listenToScroll =()=>{
        let heighthide = 250;
        const winscroll = document.body.scrollTop || document.documentElement.scrollTop;
        if(winscroll>heighthide){
            setshowscroll(true)
        }
        else{
            setshowscroll(false)
        }
    }
    useEffect(()=>{
        window.addEventListener("scroll",listenToScroll);
       
    },[])
    return(
        <Wrapper>
         {showscroll && (
            <div className="gototop" onClick={gotop}>
             <FaArrowUp className="arrowcircleup"/>
            </div>
         )}
        </Wrapper>
    )
}