import React from 'react';
import { useEffect,useState } from 'react';
import {db,auth,firestore} from '../FirebaseConfig/firebaseconfigs';
import { collection, addDoc , query , where, getDocs, doc} from "firebase/firestore";
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
export default function AddProduct(){

    const[producttitle,setproducttitle] = useState("");
    const[producttype,setproducttype] = useState("");
    const[description , setdescription]=useState("");
    const[customersupport,setcustomersupport] = useState("");
    const[price,setprice] = useState("");
    const[productimage1,setproductimage1] = useState("");
    const[productimage2,setproductimage2] = useState("");
    const[imageError , setimageError] = useState("");
    const[successmsg , setsuccessmsg] = useState("");
    const[uploaderror,setuploaderror] = useState("");
 
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
    // console.log(loggeduser)
    const types = ['imagejpg','image/jpeg' , 'image/png' ,'image/gif' , 'image/PNG','image/webp','image/WEBP'];

    
    const handleImage1 =(e)=>{
        e.preventDefault();
        let selfile = e.target.files[0];
        if(selfile){
            if(selfile && types.includes(selfile.type)){
                setproductimage1(selfile);
                setimageError('');
            }
        }
        else{
            setproductimage1(null);
            setimageError('Please select a valid image file type(png or jpg)');
        }
    }
   
    
    const handleAddProduct =(e)=>{
        e.preventDefault();
        const storageRef = ref(db, `product-images${producttype.toUpperCase()}/${Date.now()}`);
        // console.log(storageRef._location.path);
        uploadBytes(storageRef,productimage1)
        .then(()=>{
            getDownloadURL(storageRef).then(url=>{
                addDoc(collection(firestore,`products-${producttype}`),{
                    producttitle,
                    producttype,
                    description,
                    customersupport,
                    price,
                    productimage1:url,
                    
                })
            })
        })
    }
    
    return(
        <>
            <div className='addproduct'>
             
              {loggeduser && (loggeduser[0].email == "anjalirawat1722@gmail.com" || loggeduser[0].email == "akashtiw43@gmail.com") ? <div>
                          <form className='add-prod' onSubmit={handleAddProduct}>
                            <h2>Add  Products</h2>
                            {successmsg && <div className='success-msg'>{successmsg}</div>}
                            {uploaderror&& <div className='error-msg'>{uploaderror}</div>}

                            <label>Product Title</label>
                            <input type="text" placeholder='Enter Product Title.....' onChange={(e)=>{setproducttitle(e.target.value)}}/>

                            <label>Product Type</label>
                            <input type="text" placeholder='Enter Product Type....' onChange={(e)=>{setproducttype(e.target.value)}}/>

                            <label>Product Description</label>
                            <input type="text" placeholder='Enter Product Description.....' onChange={(e)=>{setdescription(e.target.value)}}/>

                            <label>Customer Support</label>
                            <input type="text" placeholder='Customer Support.....' onChange={(e)=>{setcustomersupport(e.target.value)}}/>

                            <label>Product Price</label>
                            <input type="text" placeholder='Enter Product Price.....' onChange={(e)=>{setprice(e.target.value)}}/>

                            <label>Product Image1</label>
                            <input type="file" placeholder='Enter Product Image1.....' onChange={handleImage1}/>

                           

                            {imageError && <div className='error-msg'>{imageError}</div>}
                            

                        <button type='submit'>Submit</button>
                         </form>  
                     </div> : <div>You have no access to this option.</div>}
            </div>
        </>
    )
}