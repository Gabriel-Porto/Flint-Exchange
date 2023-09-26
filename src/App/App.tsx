import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"

import Logo from "../assets/Flint Currency Logo.svg"
import { AppContainer } from "./Styles"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppContainer>
        <img src={Logo} alt="" />
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  )
}
