import React from 'react';
import styled from "styled-components";


export default function Contact(){
    const Wrapper = styled.section`
  
    .container {
      margin-top: 2rem;
     
      .contact-form {
        max-width: 35rem;
        margin: auto;
        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 2.2rem;
          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;
           
          }
        }
      }
    }
    .sub{
        border-radius:20px;
    }
    h2{
        font-family: "Shadows Into Light Two";
        color: rgb(101, 101, 101);
        text-transform: uppercase;
       line-height: 50px;
       letter-spacing: 0.7px;
       text-align:center;
    }
    input, textarea{
      max-width: 30rem;
      color: black;
      padding: 0.6rem 2rem;
      border: 1px solid black;
      border-radius:20px;
      text-transform: uppercase;
    }
    textarea{
        height:230px;
      width:44ppx;
    }
    input[type="submit"]{
    max-width: 9rem;
    margin-top:0.1rem;
    margin-bottom:0.7rem;
    background-color:green;
    color:white;
    padding: 1rem 1rem;
    border:1px solid green;
    text-transform: uppercase;
    font-size: 1rem;
    cursor: pointer;
    }

    `;
    return(
        <Wrapper id='contact'>
            <h2>Contact Us</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.6550166572383!2d83.77366651487381!3d26.499050383307445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993c538fef0c049%3A0x9be2553fd927f688!2sDURGA%20MAA%20MANDIR!5e0!3m2!1sen!2sin!4v1680865353439!5m2!1sen!2sin" width="100%" height="400" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className='container'>
                <div className='contact-form'>
                    <form action='https://formspree.io/f/xayzdqen' method='POST' className='contact-inputs'>
                        <input type='text' name='username' autoComplete='off' placeholder='Enter your name....' required/>
                        <input type='text' name='email' autoComplete='off' placeholder='Enter your email....' required/>
                        <textarea name='feedback' placeholder='Enter your message here....' autoComplete='off' cols='20' rows='20'/>
                        <input type='submit' className='sub' value='SEND'></input>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}