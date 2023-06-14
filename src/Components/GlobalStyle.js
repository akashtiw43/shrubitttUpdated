import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

h1{
    font-size: 6rem;
    font-weight: 900;
    color:white;
}
h2{
    font-size:2rem;
    font-weight:300;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
  text-align:center;
}
.grid {
  display: grid;
  gap: 9rem;
}
.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}
.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}
.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}
input, textarea{
    max-width: 50rem;
    color: black;
    padding: 1.6rem 2.4rem;
    border: 1px solid black;
    text-transform: uppercase;
}
input[type="submit"]{
    max-width: 16rem;
    margin-top: 2rem;
    background-color:green;
    color:white;
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: .1rem;
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;
    }

`;