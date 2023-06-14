import Carousel from "react-multi-carousel";
import SliderProductCard from "./SliderProductCard";
import "react-multi-carousel/lib/styles.css";
import React, { useState, useEffect } from 'react';

import { collection, query, onSnapshot, getDocs, QuerySnapshot } from 'firebase/firestore';
import { firestore } from '../FirebaseConfig/firebaseconfigs'
export default function Slider(props) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = () => {
            const productsArray = [];
            const path = `products-${props.type}`
            // console.log(path);

            getDocs(collection(firestore, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id })
                    console.log(doc.id, "=>", doc.data())
                })
                setProducts(productsArray)
            }).catch((error) => {
                console.log(error.message)
            })
        }
        getProducts();
    }, [])
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      const product=products.map(item=>{
        return(
            <SliderProductCard key={item.id} item={item}/>
        )
      })
    return (
        <>
            <div className="similar">
                <Carousel responsive={responsive}>
                    {product}
                </Carousel>
            </div>
        </>
    )
}