import React from 'react'
import Card from '../Components/Card'
import Service from '../Components/Service'
export default function Banner(props) {
  return (
    <div className='banner-cont'>
        <h3 className='banner-heading'>{props.title}</h3>
        <div className='banner'>
            
            {props.data.map(p=>{
                if(props.title==="Services"){
                    return(
                        <Service desc={p.info} image={p.src} name={p.name} key={p.name}/> 
                   )   
                }else{
                    return(
                        <Card image={p.src} name={p.name} key={p.name}/>
                   )
                }                
            })}
        </div>
    </div>
  )
}
