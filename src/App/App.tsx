import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"
import backgroungImg from "../assets/Mask.jpg"
import graphImg from "../assets/graph.svg"
import ConvertIcon from "../assets/ConvertButtonIcon.svg"
import { NumericFormat } from "react-number-format"

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

export function App() {
  const [isConverted, setIsConverted] = useState(false)

  const [amountToBeConverted, setAmountToBeConverted] = useState(0)
  const [stateTax, setStateTax] = useState(0)
  const [purchaseType, setPurchaseType] = useState("dinheiro")
  const [dolarValue, setDolarValue] = useState(0)

  const [convertedValue, setConvertedValue] = useState(0)

  useEffect(() => {
    async function getResults() {
      const results = await axios.get(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL"
      )
      setDolarValue(results.data.USDBRL.ask)
    }
    getResults()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (purchaseType === "dinheiro") {
      setConvertedValue((amountToBeConverted + stateTax) * (dolarValue + 1.1))
    }
    if (purchaseType === "cartão") {
      setConvertedValue((amountToBeConverted + stateTax + 6.4) * dolarValue)
    }
    setIsConverted(true)
  }

  // function currencyFormatter(value) {
  //   if (!Number(value)) return ""

  //   const amount = new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).format(value / 100)

  //   return `${amount}`
  // }

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
                <h1>R$ {convertedValue.toFixed(2).replace(".", ",")}</h1>
              </Result>
              <ResultDetails>
                <p>
                  Compra no {purchaseType} e taxa de <span>{stateTax}</span>
                </p>
                <p>
                  Cotação do dólar:{" "}
                  <span>$1,00 = R${Number(dolarValue).toFixed(2)}</span>
                </p>
              </ResultDetails>
            </ResultsCard>
          ) : (
            <CurrencyCard onSubmit={handleSubmit}>
              <FormBlock>
                <Field>
                  <label htmlFor="">Dólar</label>
                  <DolarInput>
                    <NumericFormat
                      placeholder={"$"}
                      id="dolarInput"
                      allowNegative={false}
                      thousandSeparator="."
                      prefix={"$"}
                      decimalScale={2}
                      decimalSeparator=","
                      onValueChange={(values) => {
                        if (values.floatValue) {
                          setAmountToBeConverted(values.floatValue)
                        }
                      }}
                    />
                  </DolarInput>
                </Field>
                <Field>
                  <label htmlFor="">Taxa do Estado</label>
                  <TaxInput>
                    <NumericFormat
                      placeholder={"0 %"}
                      id="stateTaxInput"
                      allowNegative={false}
                      thousandSeparator="."
                      suffix={"%"}
                      decimalScale={2}
                      decimalSeparator=","
                      onValueChange={(values) => {
                        if (values.floatValue) {
                          setStateTax(values.floatValue)
                        }
                      }}
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
                      onChange={() => setPurchaseType("dinheiro")}
                      defaultChecked
                    />
                    <span>Dinheiro</span>
                  </label>

                  <label htmlFor="purchaseTypeCard">
                    <input
                      type="radio"
                      name="purchaseType"
                      onChange={() => setPurchaseType("cartão")}
                      id="purchaseTypeCard"
                    />
                    <span>Cartão</span>
                  </label>
                </div>
              </RadioBlock>
              <button
                type={"submit"}
                disabled={amountToBeConverted && stateTax ? false : true}
              >
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
