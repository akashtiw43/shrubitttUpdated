import React from 'react'

export default function Card(props) {
var code=require(`../Images/${props.image}`)
  return (
    <div className='card-cont'>
        <img src={code}/>
        <h4>{props.name}</h4>
        {props.price && <h4>{props.price}</h4>}
    </div>
  )
}
