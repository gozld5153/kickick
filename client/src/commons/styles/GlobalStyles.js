import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: Roboto, "Noto Sans KR", sans-serif;
    }
    a {
        margin: 0;
        padding: 0;
        font-size: 100%;
        vertical-align: baseline;
        text-decoration: none;
        color: black;
    }
    input {
        border: none;
        vertical-align: middle;
    }
    input:focus {
        outline: none;
    }
    textarea:focus {
        outline: none;
    }
    button {
        border: 0;
        background: none;
        cursor: pointer;
        
        &:focus {
            outline: none;
        }
    }
    strong { font-weight: bold !important; }
    em { font-style: italic !important; }
    h1,h2,h3 {
        font-weight:bold;
    }

    /* img {
        pointer-events:none;
    } */
  /* ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #0c0c52;
    border-radius: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 0.5rem;
    
  } */
   
`;

export default GlobalStyles;
