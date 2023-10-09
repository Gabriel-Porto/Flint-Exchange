import { useState } from "react"
import api from "../services/api"
import { NumericFormat } from "react-number-format"
import useSWR from "swr"

import { GlobalStyle } from "../styles/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "../styles/theme"
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
import arrowLeft from "../assets/arrow-left.svg"
import Logo from "../assets/Flint Currency Logo.svg"
import graphImg from "../assets/graph.svg"
import backgroungImg from "../assets/Mask.jpg"
import ConvertIcon from "../assets/ConvertButtonIcon.svg"

interface ICurrencyConvert {
  code: string
  codein: string
  name: string
  high: string
  low: string
  varBid: string
  pctChange: string
  bid: string
  ask: string
  timestamp: string
  create_date: string
}

export function App() {
  const [isConverted, setIsConverted] = useState(false)

  const [amountToBeConverted, setAmountToBeConverted] = useState(0)
  const [stateTax, setStateTax] = useState(0)
  const [purchaseType, setPurchaseType] = useState("dinheiro")
  const [dolarValue, setDolarValue] = useState(0)
  const [dateOfFetch, setDateOfFetch] = useState(0)

  const [convertedValue, setConvertedValue] = useState(0)

  const fetcher = (url) =>
    api.get(url).then((res) => {
      setDolarValue(Number(res.data.USDBRL.ask))
      setDateOfFetch(res.data.USDBRL.create_date)
      return res.data
    })

  const { data, mutate } = useSWR("last/USD-BRL", fetcher, {
    refreshInterval: 86400,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // useEffect(() => {
  //   async function getResults() {
  //     const results = await axios.get(
  //       "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  //     )
  //     setDolarValue(Number(results.data.USDBRL.ask))
  //   }
  //   getResults()
  // }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (purchaseType === "dinheiro") {
      setConvertedValue(
        (amountToBeConverted + amountToBeConverted * (stateTax / 100)) *
          (dolarValue + dolarValue * (1.1 / 100))
      )
    }
    if (purchaseType === "cartão") {
      setConvertedValue(
        (amountToBeConverted +
          amountToBeConverted * (stateTax / 100) +
          amountToBeConverted * (6.4 / 100)) *
          dolarValue
      )
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
            <h3>14 de janeiro 2021 | 21:00 UTC {dateOfFetch}</h3>
            <p>Dados de câmbio disponibilizados pela Morningstar.</p>
          </HeaderText>
        </header>
        <main>
          {isConverted ? (
            <ResultsCard>
              <button
                onClick={() => {
                  setIsConverted(false)
                  setAmountToBeConverted(0)
                  setStateTax(0)
                  setPurchaseType("dinheiro")
                }}
              >
                <img src={arrowLeft} alt="Convert Icon" />
                Voltar
              </button>
              <Result>
                <h2>O resultado do cálculo é</h2>
                <h1>R$ {convertedValue.toFixed(2).replace(".", ",")}</h1>
              </Result>
              <ResultDetails>
                <p>
                  Compra no {purchaseType} e taxa de <span>{stateTax}%</span>
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
                  <label htmlFor="dolarInput">Dólar</label>
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
                        if (values.floatValue || values.floatValue === 0) {
                          setAmountToBeConverted(values.floatValue)
                        }
                      }}
                    />
                  </DolarInput>
                </Field>
                <Field>
                  <label htmlFor="stateTaxInput">Taxa do Estado</label>
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
                        if (values.floatValue || values.floatValue === 0) {
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
                disabled={
                  amountToBeConverted ||
                  (amountToBeConverted === 0 && stateTax) ||
                  stateTax === 0
                    ? false
                    : true
                }
                onClick={async () => {
                  mutate({ ...data, ask: data.ask })
                }}
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
