import { CurrenciesHeader } from "./components/CurrenciesHeader";
import { CurrencyExchange } from "./components/CurrencyExchange";
import { CurrencyRate } from "./interfaces/Currency.interface";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCurrencyRate } from "./services/currencyRate.service";
import Spinner from "./components/Spinner";

function App(): JSX.Element {
  const [currencyRate, setCurrencyRate] = useState<CurrencyRate | null>(null);

  const getCurrencyData = async () => {
    const currencyRateData = await getCurrencyRate();
    setCurrencyRate(currencyRateData);
  };
  useEffect(() => {
    getCurrencyData();
  }, []);

  return (
    <MainBlock>
      <Label>Currency Exchange</Label>
      {!currencyRate ? (
        <Spinner />
      ) : (
        <CurrencyBlock>
          <CurrenciesHeader currencyRate={currencyRate} />
          <CurrencyExchange currencyRate={currencyRate} />
        </CurrencyBlock>
      )}
    </MainBlock>
  );
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 820px) {
    & > div {
      justify-content: center;
      & > * {
        width: 360px;
        max-width: 360px;
        flex-grow: unset;
      }
    }
  }

  @media screen and (max-width: 540px) {
    & > div {
      flex-direction: column-reverse;
      & > * {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
    }
  }
`;

const CurrencyBlock = styled.div`
  display: flex;
`;

const Label = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #fcf2de;
`;

export default App;
