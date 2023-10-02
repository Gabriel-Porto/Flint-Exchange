import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"
import backgroungImg from "../assets/background_mask.svg"
import graphImg from "../assets/graph.svg"
import ConvertIcon from "../assets/ConvertButtonIcon.svg"
import InputMask from "react-input-mask"

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
  const handleSubmit = (event: any) => {
    // event?.preventDefault()
    console.log("entrou")
  }

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
        <main>
          <CurrencyCard onSubmit={handleSubmit}>
            <FormBlock>
              <Field>
                <label htmlFor="">Dólar</label>
                <DolarInput>
                  {/* <span>$</span> */}
                  <InputMask mask={"$9,99"} placeholder={"$"} id="dolarInput" />
                </DolarInput>
              </Field>
              <Field>
                <label htmlFor="">Taxa do Estado</label>
                <TaxInput>
                  <InputMask
                    mask={"9,99%"}
                    placeholder={"%"}
                    id="stateTaxInput"
                  />
                  {/* <span>%</span> */}
                </TaxInput>
              </Field>
            </FormBlock>
            <RadioBlock>
              <label htmlFor="purchaseType">Tipo de compra</label>
              <div className="radioOptions">
                <label htmlFor="purchaseTypeMoney">
                  <input
                    type="radio"
                    name="purchaseType"
                    id="purchaseTypeMoney"
                  />
                  <span>Dinheiro</span>
                </label>

                <label htmlFor="purchaseTypeCard">
                  <input
                    type="radio"
                    name="purchaseType"
                    id="purchaseTypeCard"
                  />
                  <span>Cartão</span>
                </label>
              </div>
            </RadioBlock>
            <button type={"submit"}>
              <img src={ConvertIcon} alt="Convert Icon" />
              Converter
            </button>
          </CurrencyCard>
        </main>
        <img src={backgroungImg} alt="" />
        <img src={graphImg} alt="" />
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  )
}
