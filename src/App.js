import React from 'react';
import './App.css';
import { BrowserRouter ,Routes , Route , Outlet, NavLink} from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { GlobalStyle } from './Components/GlobalStyle';
import ProductPage from './Components/ProductPage';
import Products from './Components/Products';
import SignUp from './Components/SignUp';
import LoginModal from './Components/LoginModal';
import Main from './Components/Main'
import UserProfile from './Components/UserProfile';
import AddProduct from './Components/AddProduct';
import Cart from './Components/Cart';




const Layout =()=>{
  return(
    <div className='app'>
      <Navbar/>
      <Outlet className="web"/>
      <Footer/>
    </div>
  )
}


function App() {
 
  return (
    <BrowserRouter>
    {/* <GlobalStyle/> */}
      <Routes>
        <Route path ='/' element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/productpage/:id' element={<ProductPage type={'Indoor'}/>} />
        <Route path='/products/:producttype/:id' element={<Products/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/product-type/indoor' element={<ProductPage type={'Indoor'}/>}/>
        <Route path='/product-type/outdoor' element={<ProductPage type={'Outdoor'}/>}/>
        <Route path='/product-type/pots' element={<ProductPage type={'Pots'}/>}/>
        <Route path='/product-type/toolsandaccessories' element={<ProductPage type={'Accessories'}/>}/>
        <Route path='/cartdata' element={<Cart/>}/>
 
        {/* <Route path='/signin' element={<LoginModal/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
