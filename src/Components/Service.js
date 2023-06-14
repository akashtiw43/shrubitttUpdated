import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Service(props) {
    var code=require(`../Images/${props.image}`)
    return (
    <div id="services" className='service-cont'>
        <img src={code}/>
        <h4>{props.name}</h4>
        <NavLink to='/productpage/:id'><button className="service-btn">Shop Now</button></NavLink>
    </div>
  )
}
