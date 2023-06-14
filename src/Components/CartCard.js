import React from "react";
import '../index.css'
import { useState } from "react";
import { firestore } from '../FirebaseConfig/firebaseconfigs'
import { GrAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteDoc, updateDoc,doc } from "firebase/firestore";

export default function CartCard(props){
    const[items,setItems] = useState(1);
   
    let p = props.item.product.price
    // let overalltax = 10/100;
    // let overallcomission = 10/100;
    // let extraforfun = 10/100;
    // let mrp = parseInt(p);
    // mrp = mrp+(overallcomission*mrp + overalltax*mrp + extraforfun*mrp);
    // const salesprice = mrp-extraforfun*mrp;
    // ye faltu ke tax lagado ky
    
  const salesprice = p*items
 
    const decreaseqty = async ()=>{
        if(items!=1){
            setItems(items-1)
            const itemref = doc(firestore,`cart-${props.userid}`,`${props.item.id}`)
            await updateDoc(itemref,{
            quantity:items-1
        })
        }
    }
    const increaseqty = async()=>{
        setItems(items+1)
        const itemref = doc(firestore,`cart-${props.userid}`,`${props.item.id}`)
        await updateDoc(itemref,{
            quantity:items+1
        })
    }
  
    const deleteitem = async()=>{
     await deleteDoc(doc(firestore,`cart-${props.userid}`,`${props.item.id}`))
     .then(()=>{
        // console.log("document deleted")
        alert("Utem deleted successfully!")
     })
    }

   
   return(
    <>
        <div className="card-prod-container">
            <div className="cart-prod-imgtitle">
                <div className="prod-image"><img src={props.item.product.productimage1}/></div>
                <div className="prod-title"><h3>{props.item.product.producttitle}</h3></div>
            </div>
            <div className='quantitydesc'>
             <GrAdd className='additem' onClick={increaseqty}/>
             <span className='prodquant'>{props.item.quantity}</span>
             <BiMinus className='subtractitem' onClick={decreaseqty}/>
             </div>
             <div className="prodprice">Rs.{salesprice}</div>
             <button className="del" onClick={deleteitem}><RiDeleteBin6Line/></button>
        </div>
        
    </>
   )
}