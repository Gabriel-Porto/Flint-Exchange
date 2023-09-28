import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"
import ConvertIcon from "../assets/ConvertButtonIcon.svg"
import InputMask from 'react-input-mask'

import Logo from "../assets/Flint Currency Logo.svg"
import {
  AppContainer,
  AppName,
  Bar,
  CurrencyCard,
  HeaderText,
  FormBlock,
  Field,
  RadioBlock,
  DolarInput,
  TaxInput,
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
              <DolarInput>
                {/* <span>$</span> */}
                <InputMask mask={'$9,99'} placeholder={'$'}  id="dolarInput" />
              </DolarInput>
            </Field>
            <Field>
              <label htmlFor="">Taxa do Estado</label>
              <TaxInput>
                <InputMask mask={'9,99%'} placeholder={'%'} id="stateTaxInput" />
                {/* <span>%</span> */}
              </TaxInput>
            </Field>
          </FormBlock>
          <RadioBlock>
            <label htmlFor="purchaseType">Tipo de compra</label>
            <input type="radio" name="purchaseType" id="purchaseType" />
            <input type="radio" name="purchaseType" id="purchaseType" aria-label="Dinheiro"/>
          </RadioBlock>
          <button disabled>
            <img src={ConvertIcon} alt="Convert Icon" />
            Converter
          </button>
        </CurrencyCard>
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  )
}
