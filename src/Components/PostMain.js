import React from 'react'
import image from '../Images/2.png'
export default function PostMain() {
  return (
    <div className='pmain'> 
        <div className='pmain-cont'>
            <div className='pmain-cont-left'>
                <img className='pmain-img' src={image}/>
            </div>
            <div className='pmain-cont-right'>
                Some random text information about plants
            </div>    
        </div> 
    </div>
  )
}
