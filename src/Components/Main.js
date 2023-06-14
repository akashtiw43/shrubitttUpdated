import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ProductPage from './ProductPage';

import image from '../Images/anyrgb.com.png'
import { useNavigate } from 'react-router-dom';
const vars={
  marginBottom:'51px'
}

export default function Main() {
  const navigate = useNavigate();
  const displayprod=()=>{
    navigate('/product-type/indoor')
  }
 
  return (
    <main>
    <div className='main-left'>
        <button className='oxygen'> Oxygen plant</button>
        <h2 className='main-heading'>Keep Your</h2>
        <h2 className='main-heading scnd'>Plants healthy</h2>

        <p className='main-text frst'>Plants Reduce Stress Levels and Relax Your Mind Too-Hence They Are A</p>
        <p className='main-text'> Perfect Setup For Your Office And Your Home Too !</p>
        <button className='more' onClick={displayprod}>See More</button>
    </div>
    <div className='main-right'>
        <div className='circle'>
            <img className='circle-img'src={image}/>
        </div>
        {/* <div className='socials'>
            <FacebookOutlinedIcon/>
            <EmailOutlinedIcon/>
            <SubscriptionsOutlinedIcon style={{marginBottom:'15px'}}/>
        </div> */}
    </div>
    </main>
  )
}
