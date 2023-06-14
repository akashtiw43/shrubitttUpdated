import React, { useState ,useEffect} from 'react'
import {collection,query,onSnapshot,getDocs, QuerySnapshot} from 'firebase/firestore';
import {firestore} from '../FirebaseConfig/firebaseconfigs'
import Product from './Product';
// import Data from './Data'
// import Product from './Product';
// import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
// import { useParams } from 'react-router-dom';
export default function ProductPage(props) {
    const[products,setProducts] = useState([]);
    useEffect(()=>{
        const getProducts = ()=>{
            const productsArray =[];
            const path = `products-${props.type}`
            // console.log(path);

            getDocs(collection(firestore,path)).then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    productsArray.push({...doc.data(),id:doc.id})
                    // console.log(doc.id,"=>",doc.data())
                })
                setProducts(productsArray)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        getProducts();
    },[])
//    console.log(props.type);

    
    // const {id} = useParams();
    // const[maxPrice,setMaxPrice] = useState(1000);
    // const vars={
    //     color:'rgb(20,46,56)',
    //     fontSize:'2.5rem'
    //   }
      const product=products.map(item=>{
        return(
            <Product key={item.id} item={item}/>
        )
      })
      console.log(product)
  return (
    <>
        {/* <div className='product-nav'>
            <div className='logo' onClick={toggle}>
                <GrassOutlinedIcon style={vars}/>
                <h3 className='logo-text' onClick={toggle}>ShrubIt</h3>
            </div>
            <h5 className='product-nav-text' onClick={toggle}>Back to Home</h5>
        </div> */}
        <div className='product-cont'>
            <div className='product-sidebar'>
                <div className='filterItem'>
                    <h2>Product Categories</h2>
                    <a href='/product-type/indoor'><h3>Indoor Plants</h3></a>
                    <a href='/product-type/outdoor'><h3>Outdoor Plants</h3></a>
                    <a href='/product-type/pot'><h3>Pots</h3></a>
                    <a href='/product-type/toolsandaccessories'><h3>Accessories and Tools</h3></a>
                    <div className='price-sort'>
                        <h2>Price</h2>
                        <a href='#'><h3>Below 100</h3></a>
                        <a href='#'><h3>100-500</h3></a>
                        <a href='#'><h3>500-1000</h3></a>
                        <a href='#'><h3>Above 1000</h3></a>
                    </div>
                </div>
                {/* <div className='filterItem'>
                    <h2>Price Range</h2>
                    <div className='inputItem'>
                        <span>0</span><input type='range' min={0} max={6000} onChange={(event)=>{setMaxPrice(event.target.value)}}/><span>{maxPrice}</span>
                    </div>
                </div> */}
            </div>
            <div className='product-main'>
                <div className='products-list'>
                <div className='heading'> <h2>Top Results for {props.type} Plants</h2></div>
                <div className='product-section'>
                {product}
                </div>
                    {/* {products.map(item=>{
                        <Product
                        key={item.id}
                        product={item}
                        />
                       })} */}
                </div>
            </div>
        </div>
    </>
  )
}
