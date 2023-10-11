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
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { utcToZonedTime } from "date-fns-tz"

export function App() {
  const [isConverted, setIsConverted] = useState(false)

  const [amountToBeConverted, setAmountToBeConverted] = useState(null || Number)
  const [stateTax, setStateTax] = useState(null || Number)
  const [purchaseType, setPurchaseType] = useState("dinheiro")
  const [dolarValue, setDolarValue] = useState(0)
  const [dateOfFetch, setDateOfFetch] = useState("")

  const [convertedValue, setConvertedValue] = useState(0)

  const fetcher = (url: string) =>
    api.get(url).then((res) => {
      setDolarValue(Number(res.data.USDBRL.ask))
      console.log({ data: res.data })

      setDateOfFetch(formatDate(res.data.USDBRL.create_date))
      return res.data
    })

  useSWR("last/USD-BRL", fetcher, {
    refreshInterval: 24 * 60 * 60,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

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


  function formatDate(inputDateString: string) {
    const inputDate = parseISO(inputDateString)

    const utcDate = utcToZonedTime(inputDate, "Etc/UTC")

    const formattedDate = format(utcDate, "dd 'de' MMMM yyyy", {
      locale: ptBR,
    })
    const formattedTime = format(utcDate, "HH:mm", { locale: ptBR })

    return `${formattedDate} | ${formattedTime} UTC`
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
            <h3>{dateOfFetch}</h3>
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
                        if (values.floatValue) {
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
