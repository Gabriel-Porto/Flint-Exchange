import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"
import backgroungImg from "../assets/Mask.jpg"
import graphImg from "../assets/graph.svg"
import ConvertIcon from "../assets/ConvertButtonIcon.svg"
import InputMask from "react-input-mask"
import arrowLeft from "../assets/arrow-left.svg"

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
  ResultsCard,
  Result,
  ResultDetails,
} from "./Styles"
import { useEffect, useState } from "react"
import axios from "axios"

interface IPurchaseType {
  1.1: number
  6.4: number
}

export function App() {
  const [isConverted, setIsConverted] = useState(false)

  const [amountToBeConverted, setAmountToBeConverted] = useState(0)
  const [stateTax, setStateTax] = useState(0)
  const [purchaseType, setPurchaseType] = useState<IPurchaseType>(1.1)
  const [dolarValue, setdolarValue] = useState(0)

  useEffect(() => {
    async function getResults() {
      const results = await axios.get(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL"
      )
      setdolarValue(Number(Number(results.data.USDBRL.ask).toFixed(2)))
    }
    getResults()
  }, [])

  const handleChangeDolarInput = (event: any) => {
    setAmountToBeConverted(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeTaxInput = (event: any) => {
    setStateTax(Number(event.target.value))
  }
  console.log(stateTax)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault()
    const askWithMoney =
      [amountToBeConverted + stateTax] * (dolarValue + purchaseType)
    setIsConverted(true)
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
          {isConverted ? (
            <ResultsCard>
              <button onClick={() => setIsConverted(false)}>
                <img src={arrowLeft} alt="Convert Icon" />
                Voltar
              </button>
              <Result>
                <h2>O resultado do cálculo é</h2>
                <h1>R$ 240,56</h1>
              </Result>
              <ResultDetails>
                <p>Compra no dinheiro e taxa de 5.3%</p>
                <p>Cotação do dólar: $1,00 = R${dolarValue}</p>
              </ResultDetails>
            </ResultsCard>
          ) : (
            <CurrencyCard onSubmit={handleSubmit}>
              <FormBlock>
                <Field>
                  <label htmlFor="">Dólar</label>
                  <DolarInput>
                    <InputMask
                      type="text"
                      mask={"$*9,99"}
                      placeholder={"$"}
                      id="dolarInput"
                      maskPlaceholder=" "
                      onChange={handleChangeDolarInput}
                    />
                  </DolarInput>
                </Field>
                <Field>
                  <label htmlFor="">Taxa do Estado</label>
                  <TaxInput>
                    <InputMask
                      mask={" 9,99%"}
                      placeholder={"%"}
                      id="stateTaxInput"
                      maskPlaceholder=" "
                      onChange={handleChangeTaxInput}
                    />
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
                      checked
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
          )}
        </main>
        <img src={backgroungImg} alt="" />
        <img src={graphImg} alt="" />
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>
  )
}
