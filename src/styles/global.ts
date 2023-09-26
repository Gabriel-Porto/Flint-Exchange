import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.colors["gray-600"]};
    -webkit-font-smoothing: antialiased;
  }
    
  body, text-area, input, button {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      font-weight: 500;
      font-size: 1.125rem;
      word-wrap: break-word; //muito bom para responsividade de textos
  }
  
`