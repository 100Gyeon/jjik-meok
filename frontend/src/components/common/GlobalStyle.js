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
    display: flex;
    flex-direction: column;
    margin: 0 8%;
    min-height: 100vh;
  }

  html {
    font-size: 62.5%;
  }
  
  * {
    box-sizing: border-box;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
