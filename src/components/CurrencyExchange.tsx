import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Currency,
  CurrencyGlyph,
  CurrencyRate,
} from "../interfaces/Currency.interface";
import round from "../utils/round";

interface MonetaryUnit {
  currencyRate: CurrencyRate;
}

enum InputType {
  Base = "base",
  Dest = "dest",
}

const exchangeCurrency = (
  value: number,
  baseCurrencyRate: number,
  destCurrencyRate: number
) => {
  return (value * baseCurrencyRate) / destCurrencyRate;
};

export const CurrencyExchange = ({
  currencyRate,
}: MonetaryUnit): JSX.Element => {
  const [baseCurrency, setBaseCurrency] = useState(Currency.UAH);
  const [destCurrency, setDestCurrency] = useState(Currency.USD);
  const [baseCurrencyValue, setBaseCurrencyValue] = useState("");
  const [destCurrencyValue, setDestCurrencyValue] = useState("");

  useEffect(() => {
    /**
     * This is needed to update currency exchange if one of the currencies is changed
     * Base value should be left the same, while dest value should be calculated
     */
    handleInputChange(InputType.Base, baseCurrencyValue);
  }, [baseCurrency, destCurrency]);

  const handleInputChange = (inputType: InputType, value: string) => {
    const floatValue = parseFloat(value);
    const mapSetFuncs = {
      [InputType.Base]: [setBaseCurrencyValue, setDestCurrencyValue],
      [InputType.Dest]: [setDestCurrencyValue, setBaseCurrencyValue],
    };

    const [setBaseInput, setDestInput] = mapSetFuncs[inputType];
    setBaseInput(value);
    setDestInput(
      !isNaN(floatValue)
        ? round(
            exchangeCurrency(
              floatValue,
              currencyRate.rates[baseCurrency],
              currencyRate.rates[destCurrency]
            ),
            4
          ).toString()
        : ""
    );
  };

  const swapCurrencies = () => {
    setBaseCurrency(destCurrency);
    setDestCurrency(baseCurrency);
  };
  return (
    <CurrencyExchangeBlockWrapper>
      <CurrencyExchangeBlock>
        <CurrencyInputBlock>
          <CurrencySelectBlock
            value={baseCurrency}
            onChange={({ target }) => setBaseCurrency(target.value as Currency)}
          >
            {Object.entries(currencyRate.rates)
              .filter(([currency, _]) => currency !== destCurrency)
              .map(([currency]) => (
                <option key={`base-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
          </CurrencySelectBlock>
          <CurrencyExchangeInput
            placeholder="100.00"
            type="number"
            value={baseCurrencyValue}
            onChange={({ target }): void =>
              handleInputChange(InputType.Base, target.value)
            }
          ></CurrencyExchangeInput>
        </CurrencyInputBlock>
        <SwapBlock>
          <CurrencySwapButton onClick={swapCurrencies}>
            <img src="swap_icon.svg" />
          </CurrencySwapButton>
          <ExchangeBlock>
            <ExchangeLabel>{`1${CurrencyGlyph[baseCurrency]} = ${round(
              exchangeCurrency(
                1,
                currencyRate.rates[baseCurrency],
                currencyRate.rates[destCurrency]
              ),
              4
            )}${CurrencyGlyph[destCurrency]}`}</ExchangeLabel>
          </ExchangeBlock>
        </SwapBlock>
        <CurrencyInputBlock>
          <CurrencySelectBlock
            value={destCurrency}
            onChange={({ target }) => setDestCurrency(target.value as Currency)}
          >
            {Object.entries(currencyRate.rates)
              .filter(([currency, _]) => currency !== baseCurrency)
              .map(([currency]) => (
                <option key={`dest-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
          </CurrencySelectBlock>
          <CurrencyExchangeInput
            placeholder="100.00"
            type="number"
            onChange={({ target }): void =>
              handleInputChange(InputType.Dest, target.value)
            }
            value={destCurrencyValue}
          ></CurrencyExchangeInput>
        </CurrencyInputBlock>
      </CurrencyExchangeBlock>
    </CurrencyExchangeBlockWrapper>
  );
};

const CurrencyExchangeBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 8px;
`;

const CurrencyExchangeBlock = styled.div`
  display: flex;
  border-radius: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: #ffae6b;
  padding: 0 0.5rem 0.5rem 0.5rem;
`;

const CurrencySelectBlock = styled.select`
  display: flex;
  border: none;
  border-bottom: 1px solid;
  background-color: transparent;
  color: #fcf2de;
  font-weight: 600;
  font-size: 20px;
  margin-right: 0.5rem;
  &:focus-visible {
    outline: none;
  }
`;

const CurrencyExchangeInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  text-align: right;
  background-color: transparent;
  color: #fcf2de;
  font-weight: 800;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #fcf2de;
  &:focus-visible {
    outline: none;
  }
`;

const CurrencyInputBlock = styled.div`
  display: flex;
  margin: 0.75rem 0;
`;

const SwapBlock = styled(CurrencyInputBlock)`
  margin: 0;
  margin-top: 0.5rem;
`;

const CurrencySwapButton = styled.button`
  & img {
    width: 20px;
    height: 20px;
  }
  background-color: #fec18c;
  border: 1px solid #fcf2de;
  border-radius: 0.25rem;
  margin: 8px auto 8px 8px;
  padding-top: 4px;
`;

const ExchangeBlock = styled.div`
  display: flex;
  background-color: #fec18c;
  border: 1px solid #fcf2de;
  border-radius: 0.25rem;
  padding: 0 8px;
`;

const ExchangeLabel = styled.h3`
  color: #fcf2de;
  line-height: 5px;
`;
