import styled from "styled-components"

export const AppContainer = styled.div`
  height: 100vh;
  position: relative;

  main {
    margin: 0 27.5rem 0 6.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 10.5rem;
  }

  main svg {
    margin-right: 27.2rem;
  }

  & > img {
    max-width: 100vw;
    max-height: 100%;

    height: 100%;

    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  }

  img + img {
    width: 31rem;
    height: 31rem;

    position: absolute;
    right: 17.8%;
    top: 20rem;
  }

  header {
    padding: 6.4rem 0 0 6.4rem;

    width: fit-content;
    display: flex;
    align-items: center;
    gap: 4.8rem;
  }
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  p {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors["gray-400"]};
  }
`
export const AppName = styled.div`
  position: relative;
  height: 8.1rem;

  footer {
    position: relative;
    top: -0.7rem;
    display: flex;
    align-items: start;
    justify-content: space-between;

    h2 {
      position: absolute;
      left: 5.74rem;
      bottom: -1.5rem;
      color: ${(props) => props.theme.colors.main};
      font-size: 1.8rem;
    }
  }
`
export const Bar = styled.div`
  position: absolute;
  top: -0.1rem;
  background-color: ${(props) => props.theme.colors.main};
  opacity: 0.32;
  height: 0.4rem;
  width: 5.2rem;
`

export const CurrencyCard = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 3.2rem;

  label {
    font-size: 1.8rem;
  }

  button {
    display: flex;
    padding: 16px;
    gap: 16px;

    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.main};
    background: ${(props) => props.theme.colors.main};

    color: ${(props) => props.theme.colors.background};
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 150%;
    font-family: ${(props) => props.theme.fontFamilies.SofiaSans};
  }

  button:disabled {
    background: ${(props) => props.theme.colors["gray-600"]};
  }
`

export const FormBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  width: 16.8rem;
  padding: 1.6rem;
  height: 5.6rem;

  font-size: 2rem;

  box-shadow: 0px 8px 4px 0px rgba(13, 17, 27, 0.08);
  border: 1px solid ${(props) => props.theme.colors["gray-600"]};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.background};

  input {
    height: 100%;

    font-size: 2rem;
    font-family: ${(props) => props.theme.fontFamilies.SofiaSans};
    color: ${(props) => props.theme.colors["gray-600"]};
    border: none;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    & #stateTaxInput {
      width: fit-content;
    }
  }

  input:focus {
    outline: 0;
  }
`
export const DolarInput = styled(InputWrapper)`
  input {
    width: 100%;
  }
`
export const TaxInput = styled(InputWrapper)`
  position: relative;

  justify-content: start;
  input {
    width: 100%;
  }
`

export const RadioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: 6rem;

  .radioOptions {
    display: flex;
    gap: 1.6rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    label span {
      font-family: ${(props) => props.theme.fontFamilies.SofiaSans};
    }
  }

  input[type="radio"] {
    color: ${(props) => props.theme.colors.main};
    height: 2.4rem;
    width: 2.4rem;
  }
`

export const ResultsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 3.2rem;

  width: 30.5rem;

  button {
    display: flex;
    gap: 1.6rem;
    align-items: center;
    justify-content: center;

    padding: 1.6rem;

    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors["gray-400"]};
    background: ${(props) => props.theme.colors.background};

    font-size: 16px;
    font-weight: 600;
    font-family: ${(props) => props.theme.fontFamilies.SofiaSans};
    line-height: 150%;

    box-shadow: 0px 8px 4px 0px rgba(13, 17, 27, 0.08);
  }

  button:disabled {
    background: ${(props) => props.theme.colors["gray-600"]};
  }
`

export const Result = styled.div`
  h2 {
    color: ${(props) => props.theme.colors["gray-600"]};

    font-family: ${(props) => props.theme.fontFamilies.SofiaSans};
    font-size: 2rem;
    font-weight: 600;
    line-height: 160%;
  }

  h1 {
    color: ${(props) => props.theme.colors.main};

    font-family: ${(props) => props.theme.fontFamilies.SofiaSans};
    font-size: 6.4rem;
    font-weight: 600;
    line-height: 125%;
  }
`

export const ResultDetails = styled.div`
  p {
    color: ${(props) => props.theme.colors["gray-600"]};
    font-family: ${(props) => props.theme.fontFamilies.Roboto};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 228.571%;

    span {
      font-weight: 400;
    }
  }
`
