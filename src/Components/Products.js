import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from './Slider';
import styled from 'styled-components';
import { GrAdd } from "react-icons/gr";
import { BiPurchaseTag } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { HiShoppingBag } from "react-icons/hi";
import { auth, firestore } from '../FirebaseConfig/firebaseconfigs';
import { getDoc,doc, addDoc } from 'firebase/firestore';
import { collection , query , where,getDocs} from "firebase/firestore";
const images = {
    image1:require('../Images/bonsai1.webp'),
    image2:require('../Images/bonsai2.webp')
}


export default function Products(){
  const{producttype,id} = useParams();
 
 
    // const[selectImg , setSelectImg] = useState(images.image1);
    const[product,setProducts] = useState('');
    const[successText,setSuccessText] = useState('');
    const[errorText,setErrorText] = useState('');
    const[items,setItems] = useState(1);
  
   

    const Wrapper = styled.section`
      .prod-container{
        padding:20px 50px;
        display:flex;
        flex-direction:row;
        gap:5rem;
        height:75vh;
        // background-color:red;
      }
      .leftimages{
        display:flex;
        flex-direction:column;
        gap:1rem;
        
      }
      .leftimages img{
        width:160px;
        height:160px;
        object-fit:cover;
        cursor:pointer;
      }
      .main-img{
        padding:0 30px 40px 10px;
      }
      .main-img img{
        width:320px;
        height:100%;
      }
      .prod-details{
        display:flex;
        flex-direction:column;
        // gap:1rem;
      }
      h1{
        color:black;
        font-size:2rem;
      }
      p{
        font-size:1rem;
        color:grey;
      }
      .quantitydesc{
        display:flex;
        gap:1rem;
        
      }
      .prodquant{
        text-align:center;
      }
      .additem , .subtractitem{
        border:1px solid grey;
        padding:5px;
        background-color:lightgrey;
        border-radius:5px;
      }
      .addtocart{
        color: white;
        font-weight: 400;
        font-size: 1.1rem;
        background-color: rgb(48, 124, 71);
        border: none;
        margin-top: 35px;
        border-radius: 10px;
        margin-bottom: 20px;
        padding: 12px 22px;
      }
      .addtocart:hover{
        cursor: pointer;
        background: transparent;
        color: rgb(20,46,56);
        transition: .5s ease-in-out;
        border: 2px solid rgb(20,46,56);
      }
      .purchase-links{
        display:flex;
        flex-direction:row;
        gap:4rem;
      }
      .bag{
        margin-right:7px;
      }
      @media(max-width:781px){
        .leftimages{
            align-items:center;
        }
        .leftimages img{
            width:150px;
            heigh:150px;
        }
      }
    `;
    
    // const images = ["bonsai1.webp", "bonsai2.webp"];
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

    function GetCurrentProduct(){
      useEffect(()=>{
        const getProducts = async()=>{
          const docRef = doc(firestore,`products-${producttype}`,id);
          
          const docSnap = await getDoc(docRef);
          // console.log(docSnap)
          setProducts(docSnap.data());
        };
        getProducts();
      },[])
      return product;
    }
   GetCurrentProduct();
   
   const addTOCart=()=>{
    if(loggeduser){
addDoc(collection(firestore,`cart-${loggeduser[0].uid}`),{
  product,quantity:1
}).then(()=>{
  setSuccessText('Product added to cart successfully')
}).catch((error)=>{
  setErrorText(error.message)
})
    }
   
    else{
      setErrorText("You need to login first!!");
    }
   }
   

    return(
        <>  
        
            <Wrapper>
            {/* <h1>{product.producttype}</h1>
            <h1>{product.id}</h1> */}
           
            
            {product?
              
              <div className="prod-container">
              
              {/* <div className="leftimages">
                  <img src={productimage1} alt="img1"/>
                  <img src={images.image2} alt="img2" onClick={()=>{setSelectImg(images.image2)}}/>
              </div> */}
          <div className="main-img">
          
              <img src={product.productimage1} alt="product_image"/>
          </div>
          <div className="prod-details">
              {successText && <div className="success-msg">{successText}</div>}
              {errorText && <div className="error-msg">{errorText}</div>}
             <h1>{product.producttitle} </h1>
             <h3>{product.producttype} Plant</h3>
             <span>Rs. {product.price}</span>
             <p>{product.description}</p>
             <div className='quantitydesc'>
             <GrAdd className='additem' onClick={()=>{setItems(items+1)}}/>
             <span className='prodquant'>{items}</span>
             <BiMinus className='subtractitem' onClick={()=>{if(items!==1){setItems(items-1)}}}/>
             </div>
             <div className='purchase-links'>
             <button className='addtocart' onClick={addTOCart}> <HiShoppingBag className='bag'/>ADD TO CART</button>
             {/* <button className='addtocart'> <BiPurchaseTag className='bag'/>BUY NOW</button> */}
             </div>
          </div>
         
      </div>
            :
            <div>
              Loading......
            </div>
            }
            <h2 className='prod-details-head2'>Similar Items </h2>
            <Slider type={product.producttype}/>
            </Wrapper>
        </>
    )
}