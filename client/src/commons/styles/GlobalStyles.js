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
`;

export default GlobalStyles;
