import { useState } from "react"
import api from "../services/api"
import { NumericFormat } from "react-number-format"
import useSWR from "swr"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { utcToZonedTime } from "date-fns-tz"

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

export function App() {
  const [isConverted, setIsConverted] = useState(false)

  const [stateTax, setStateTax] = useState(null || Number)
  const [purchaseType, setPurchaseType] = useState("dinheiro")
  const [dolarValue, setDolarValue] = useState(0)
  const [dateOfFetch, setDateOfFetch] = useState("")

  const [convertedValue, setConvertedValue] = useState(0)

  console.count("render")

  const fetcher = (url: string) =>
    api.get(url).then((res) => {
      setDolarValue(Number(res.data.USDBRL.ask))
      setDateOfFetch(formatDate(res.data.USDBRL.create_date))
      return res.data
    })

  useSWR("last/USD-BRL", fetcher, {
    refreshInterval: 24 * 60 * 60,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const schema = z.object({
    amountToBeConverted: z.number().min(1, { message: "Campo Obrigatório" }),
    stateTax: z.number().min(1, { message: "Campo Obrigatório" }),
    purchaseType: z.enum(["dinheiro", "cartão"]),
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amountToBeConverted: 0,
      stateTax: 0,
      purchaseType: "dinheiro",
    },
    mode: "onChange",
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setStateTax(data.stateTax)
    setPurchaseType(data.purchaseType)

    if (data.purchaseType === "dinheiro") {
      setConvertedValue(
        (data.amountToBeConverted +
          data.amountToBeConverted * (data.stateTax / 100)) *
          (dolarValue + dolarValue * (1.1 / 100))
      )
    }
    if (data.purchaseType === "cartão") {
      setConvertedValue(
        (data.amountToBeConverted +
          data.amountToBeConverted * (data.stateTax / 100) +
          data.amountToBeConverted * (6.4 / 100)) *
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

    return `${formattedDate} \xa0\xa0 | \xa0\xa0 ${formattedTime} UTC`
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
                  setStateTax(0)
                  setPurchaseType("")
                  reset()
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
            <CurrencyCard onSubmit={handleSubmit(onSubmit)}>
              <FormBlock>
                <Field>
                  <label htmlFor="dolarInput">Dólar</label>
                  <DolarInput>
                    <Controller
                      name="amountToBeConverted"
                      control={control}
                      render={(props) => (
                        <NumericFormat
                          id="dolarInput"
                          name={props.field.name}
                          value={props.field.value}
                          placeholder={"$ 0"}
                          allowNegative={false}
                          thousandSeparator="."
                          prefix={"$"}
                          decimalScale={2}
                          decimalSeparator=","
                          onValueChange={({ floatValue }) => {
                            props.field.onChange(floatValue)
                          }}
                          {...props}
                        />
                      )}
                    />
                  </DolarInput>
                  <p>{errors?.amountToBeConverted?.message}</p>
                </Field>
                <Field>
                  <label htmlFor="stateTaxInput">Taxa do Estado</label>
                  <TaxInput>
                    <Controller
                      name="stateTax"
                      control={control}
                      render={(props) => (
                        <NumericFormat
                          id="stateTaxInput"
                          name={props.field.name}
                          value={props.field.value}
                          placeholder={"0 %"}
                          allowNegative={false}
                          thousandSeparator="."
                          suffix={"%"}
                          decimalScale={2}
                          decimalSeparator=","
                          onValueChange={({ floatValue }) => {
                            props.field.onChange(floatValue)
                          }}
                          {...props}
                        />
                      )}
                    />
                  </TaxInput>
                  <p>{errors?.stateTax?.message}</p>
                </Field>
              </FormBlock>
              <RadioBlock>
                <label htmlFor="purchaseType">Tipo de compra</label>
                <div className="radioOptions">
                  <label htmlFor="purchaseTypeMoney">
                    <input
                      type="radio"
                      {...register("purchaseType")}
                      id="purchaseTypeMoney"
                      value="dinheiro"
                      defaultChecked
                    />
                    <span>Dinheiro</span>
                  </label>

                  <label htmlFor="purchaseTypeCard">
                    <input
                      type="radio"
                      {...register("purchaseType")}
                      value="cartão"
                      id="purchaseTypeCard"
                    />
                    <span>Cartão</span>
                  </label>
                </div>
              </RadioBlock>
              <button type="submit" disabled={!isDirty || !isValid}>
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
