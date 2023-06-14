import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FiYoutube } from 'react-icons/fi';
import { FaInstagramSquare } from 'react-icons/fa';
import { SiFacebook } from 'react-icons/si';

// export default function Footer() {
//   return (
//     <div className='footer'> © Copyrights 2023 - 2024.ShrubItt Plant Nursery.All Rights Reserved.
//     </div>
//   )
// }
export default function Footer() { 
  const vars={color:"white",fontSize:"1.5rem"}
  const Wrapper = styled.section`
    
    .footer-bottom{
      display:flex;
      justify-content:space-around;
      align-items:center;
    }
    .footer-pre{
      display:flex;
      justify-content:space-around;
      align-items:center;
      flex-wrap:wrap;
    }
    .youtube{
      color:white;
    }
    .social{
      fontSize:1.5rem;
      display: flex;
      justify-content: space-between;
    }
    h3{
      text-align:center;
      
    }
  `;
  return(
    <Wrapper>
      <footer>
        <div className='footer-pre'>
          <div className='footer-address'>
            <h3>CONTACT</h3>
            <p>Raghav Nagar Near Durga Mandir, Deoria</p>
            <h5>aadijms@gmail.com</h5>
          </div>
          <div className='footer-socials'>
           <h3>Follow Us On</h3>
           <div className='social'>
           <Link classname="youtube" to="https://youtube.com/shorts/eIiWFOTIS88?feature=share"><FiYoutube style={vars}/></Link>
           <Link to="https://instagram.com/_plantnurserydeoria_?igshid=MzRlODBiNWFlZA=="><FaInstagramSquare style={vars}/></Link>
           <SiFacebook style={vars}/>
           </div>
          </div>
          <div className='footer-contact'>
            <h3>Call Us On</h3>
            <a href="tel:9455078825" style={{textDecoration:"none",color:"white"}}>+91 9455078825</a>
          </div>
        </div>
        <hr/>
        <div className='footer-bottom'>
        
          <div>
            <p>©{new Date().getFullYear()} ShrubItt Plant Nursery.All Rights Reserved. </p>
          </div>
          <div>
           <p>Privacy Policy</p>
           <p>Terms And Conditions</p>
        </div>
        </div>
        
      </footer>
    </Wrapper>
  )
}

