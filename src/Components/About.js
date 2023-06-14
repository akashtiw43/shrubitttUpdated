import React from 'react';
import image from '../Images/aboutimg.webp'
import styled from "styled-components";
function About(){
    const Wrapper = styled.section`
  .container{
    max-width:120 rem;
    margin:60px;
    text-align:center;
  }
  
  
  .img-style{
    border-radius: 50%;
    height:400px;
    width:400px;
   
  }
  h2{
    font-family: "Shadows Into Light Two";
    color: rgb(101, 101, 101);
    text-transform: uppercase;
    line-height: 50px;
    letter-spacing: 0.7px;
  }
  .data{
    color: rgb(20,46,56);
    margin: 0 auto;
  }
  p{
    text-align:left;
  }
  .grid{
    display:grid;
    gap:9rem;
  }
  .grid-two-column{
    grid-template-columns:repeat(2,1fr);
  }
  .aboutpara{
    color: rgb(20,46,56);
  font-weight: 100;
  margin: 0;
  }
  @media(max-width:1143px){
    .img-style{
      width:300px;
      height:300px;
    }
  }
  
`;

    return(
        <Wrapper>
            <div id="about" className='container'>
                <div className='grid grid-two-column'>
                    <div className='data'>
                        <h2>About us</h2>
                        <p className='aboutpara'>We, Anex Plant Nursery, situated at Malad West, Mumbai, Maharashtra, are a leading name engaged in providing a wide range of plants, gardening tools and supplies to our clients. We aim at building an excellent reputation and grow our business by creating beautiful landscapes. Greenery is the best form of decoration and thus, we have plenty of indoor and outdoor plants to choose from. Our team of experienced horticulturists and gardeners ensure that the best possible quality plants, shrubs and other associated products are made available from our end for landscaping. We are committed to magnifying customers satisfaction and that belief has helped us garner a vast clientele, which continues to grow by everyday.</p>
                    </div>
                    <div className='img'>
                        <img src={image} className="img-style"></img>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default About;