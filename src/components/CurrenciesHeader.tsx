import { Currency, CurrencyRate } from "../interfaces/Currency.interface";
import { CurrencyItem } from "./CurrencyItem";
import styled from "styled-components";

interface MonetaryUnit {
  currencyRate: CurrencyRate;
}

export const CurrenciesHeader = ({
  currencyRate,
}: MonetaryUnit): JSX.Element => {
  const currencyComponent = Object.entries(currencyRate.rates)
    .filter(([currency, _]) => currency !== currencyRate.baseCurrency)
    .map(([currency, rate]) => (
      <CurrencyItem
        key={`item-${currency}`}
        currency={currency as Currency}
        value={1 / rate}
      />
    ));
  return <CurrencyBlock>{currencyComponent}</CurrencyBlock>;
};

const CurrencyBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffae6b;
  border-radius: 0.25rem;
  margin: 0 8px;
  flex-grow: 1;
`;
