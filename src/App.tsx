import { GlobalStyle } from "./styles/global"
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from "./styles/theme"


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      Flint 
      <GlobalStyle />
    </ThemeProvider>
  )
}

