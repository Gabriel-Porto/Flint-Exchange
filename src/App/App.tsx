import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"

import Logo from "../assets/Flint Currency Logo.svg"
import {
  AppContainer,
  AppName,
  Bar,
  CurrencyCard,
  HeaderText,
  FormBlock,
  Field,
} from "./Styles"

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
        <CurrencyCard>
          <FormBlock>
            <Field>
              <label htmlFor="">Dólar</label>
              <input type="number" id="dolarInput" />
            </Field>
            <Field>
              <label htmlFor="">Taxa do Estado</label>
              <input type="number" id="stateTaxInput" placeholder=""/>
            </Field>
          </FormBlock>
          <label htmlFor="purchaseType">Tipo de compra</label>
          <input type="radio" name="purchaseType" id="purchaseType" />
          <button>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3271 7.09447C15.0332 7.38839 15.0332 7.86495 15.3271 8.15887C15.621 8.4528 16.0976 8.4528 16.3915 8.15887L19.5785 4.97187C19.8724 4.67794 19.8724 4.20138 19.5785 3.90746L16.3915 0.720447C16.0976 0.426518 15.621 0.426518 15.3271 0.720447C15.0332 1.01438 15.0332 1.49093 15.3271 1.78486L17.2267 3.68444L0.752653 3.68444C0.336974 3.68444 1.0151e-06 4.02141 0 4.43709C1.0151e-06 4.85277 0.336974 5.18974 0.752653 5.18974L17.2318 5.18974L15.3271 7.09447Z"
                fill="white"
              />
              <path
                d="M4.67291 10.8422C4.96684 10.5483 4.96684 10.0717 4.67291 9.77781C4.37899 9.48388 3.90243 9.48388 3.6085 9.77781L0.421496 12.9648C0.127568 13.2587 0.127568 13.7353 0.421496 14.0292L3.60851 17.2162C3.90243 17.5102 4.37899 17.5102 4.67292 17.2162C4.96684 16.9223 4.96684 16.4458 4.67292 16.1518L2.77333 14.2522L19.2474 14.2522C19.663 14.2522 20 13.9153 20 13.4996C20 13.0839 19.663 12.7469 19.2474 12.7469L2.76819 12.7469L4.67291 10.8422Z"
                fill="white"
              />
            </svg>
            Converter
          </button>
        </CurrencyCard>
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  )
}
