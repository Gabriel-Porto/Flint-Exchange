import styled from "styled-components"

export const AppContainer = styled.div`
  height: 100vh;
  padding: 6.4rem 0 0 6.4rem;
  header {
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

export const CurrencyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-top: 10.5rem;
  gap: 3.2rem;
  .numberInputs {
    label {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: normal;
    }
  }
`

export const FormBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem
  
`
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1.8rem;
  }
  
  input {
    font-size: 1.6rem;
    font-family: ${(props) => props.theme.fontFamilies.};
;
  }
`