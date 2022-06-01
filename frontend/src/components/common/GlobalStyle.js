import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  html,
  body {
    width: 100%;
    height: 100%;
  }

  #root {
    display: grid;
    align-items: center;
    max-width: 42rem;
    min-height: 100vh;
    margin: 0 auto;
    padding: 2rem;
  }

  html {
    font-size: 62.5%;
  }
  
  * {
    box-sizing: border-box;
  }

  body, button {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
  }

  a, a:visited {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
