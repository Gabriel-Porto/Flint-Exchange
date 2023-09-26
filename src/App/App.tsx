import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"

import Logo from "../assets/Flint Currency Logo.svg"
import { AppContainer, AppName, Bar, HeaderText } from "./Styles"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppContainer>
        <header>
          <AppName>
            <img src={Logo} alt="" />
            <footer>
              <Bar />
              <h2>Currency</h2>
            </footer>
          </AppName>
          <HeaderText>
            <h3>14 de janeiro 2021 | 21:00 UTC</h3>
            <p>Dados de câmbio disponibilizados pela Morningstar.</p>
          </HeaderText>
        </header>
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  )
}
