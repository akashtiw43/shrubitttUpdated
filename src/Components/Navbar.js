import React, { useState,useEffect} from 'react'
import LoginIcon from '@mui/icons-material/Login';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { FiLogIn } from "react-icons/fi";
import { FaHouseUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {auth,firestore} from '../FirebaseConfig/firebaseconfigs';
import { collection, addDoc , query , where, getDocs, doc} from "firebase/firestore";
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import { NavLink ,Link, useNavigate ,useHistory , useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import ProductPage from './ProductPage';



export default function Navbar(props) {

   const[showLoginModal , setLoginModal] = useState(false);
  //  const[search,setsearch] = useState("");
  //  const history = useHistory();
   const closeModal = ()=>{
    return setLoginModal(false)
   }

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
const navigate =  useNavigate();
const handleLogout = ()=>{
  auth.signOut().then(()=>{
    navigate("/")
  })
}
const[cartdata,setcartdata] = useState([]);

if(loggeduser){
  const getcartdata = async()=>{
    const cartArray = [];
    const path = `cart-${loggeduser[0].uid}`
    console.log(path)
    getDocs(collection(firestore,path)).then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        cartArray.push({...doc.data(),id:doc.id})
        console.log(doc.id,"=>",doc.data())
      });
      setcartdata(cartArray)
      console.log("done")
    }).catch((error)=>{alert(error.message)})
  }
 getcartdata();
}
console.log(cartdata.length)
// const handleSubmit=(e)=>{
//   e.preventDefault();
//   history.push(`/search?name=${search}`)
//   setsearch("");
// }

const vars={
  color:'rgb(20,46,56)',
  fontSize:'2.5rem'
}
const navIcon={
  color:'white',
  fontSize:'1.5rem'
}
  return (
  <>
    <div className='nav-cont'>
      <nav>
          <div className='logo'>
          <GrassOutlinedIcon style={vars}/>
            <Link to="/" className='head'><h3 className='logo-text'><span className='logoimg'>Shrubit</span></h3></Link>
          </div>
          <div className='links'>
            <li><a className="head" href="#services">Services</a></li>
            <li><a href='#about'className='head'>About</a></li>
            <li><Link className='head' to="/product-type/outdoor">Our Products</Link></li>
            <li><a href='#contact' className='head'>Contact Us</a></li>
            
          </div>
      </nav>
      
     {!loggeduser &&  <div className='navigate'>
      {/* <form onSubmit={handleSubmit}>
       <input type="text" className='inputfied' placeholder={<SearchOutlinedIcon style={navIcon} onChange={(e)=>{setsearch(e.target.value)}} value={search}/>}/>
      </form> */}
  
      <Link to="/signup"><PersonOutlineOutlinedIcon style={navIcon}/></Link>
      <Link to="/addproduct"><span className="addbtn">Add</span></Link>
      {/* <FiLogIn style={navIcon} onClick={()=>{setLoginModal(true)}}/> */}
      {/* <div onClick={()=>{setLoginModal(true)}}>Login</div> */}
      <LoginIcon style={{color:"white"}}onClick={()=>{setLoginModal(true)}}></LoginIcon>
      {/* <FiLogOut style={navIcon}/> */}
      {/* {showLoginModal && <MyloginModal closeModal={closeModal}/> } */}
      {/* <MenuOpenOutlinedIcon style={navIcon}/> */}
      <div className='card-btn'>
        <Link to="/cartdata"><AddShoppingCartSharpIcon style={navIcon}/></Link>
        { cartdata.length && <span className='cart-icon-css'></span>}
      </div>
     
    </div>
     }

    { loggeduser &&  <div className='navigate'>
      
      {/* <SearchOutlinedIcon style={navIcon}/> */}
      <Link to="/userprofile"><FaHouseUser style={navIcon}/></Link>
      {/* <Link to="/signup"><PersonOutlineOutlinedIcon style={navIcon}/></Link>
      <FiLogIn style={navIcon} onClick={()=>{setLoginModal(true)}}/> */}
      {/* <FiLogOut style={navIcon} onClick={handleLogout}/> */}
      <LogoutIcon style={navIcon} onClick={handleLogout}></LogoutIcon>
      {/* <div onClick={handleLogout}>log out</div> */}
      <Link to="/addproduct"><span className="addbtn">Add</span></Link>
      {/* {showLoginModal && <MyloginModal closeModal={closeModal}/> } */}
      {/* <MenuOpenOutlinedIcon style={navIcon}/> */}
      
      <div className='card-btn'>
        <Link to="/cartdata"><AddShoppingCartSharpIcon style={navIcon}/></Link>
       { cartdata.length && <button className='cart-icon-css'>{ cartdata.length}</button>}
      </div>
    </div>}
      
    </div>
    {showLoginModal && <LoginModal closeModal={closeModal}/> }
    {/* <div className='product-types'>
      <a href='/product-type/indoor'><button>Indoor Plants</button></a>
      <a href='/product-type/outdoor'><button>Outdoor Plants</button></a>
      <a href='/product-type/pots'><button>Pots</button></a>
      <a href='/product-type/toolsandaccessories'><button>Tools And Accessories</button></a>
    </div> */}
   
  </>
  )
}
