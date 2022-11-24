import { Currency, CurrencyFlags } from "../interfaces/Currency.interface";
import styled from "styled-components";
import round from "../utils/round";

interface CurrencyProps {
  currency: Currency;
  value: number;
}
export const CurrencyItem = ({
  currency,
  value,
}: CurrencyProps): JSX.Element => {
  return (
    <CurrencyRateBlock>
      <CurrencyBlockWrapper>
        <CurrencyBlock>
          <Image src={CurrencyFlags[currency]} />
          <CurrencyName>{currency}</CurrencyName>
        </CurrencyBlock>
        <CurrencyValue>{round(value, 4)}</CurrencyValue>
      </CurrencyBlockWrapper>
    </CurrencyRateBlock>
  );
};

const CurrencyRateBlock = styled.div`
  display: flex;
  border-bottom: 1px solid #fcf2de;
  &:last-child {
    border: none;
  }
`;

const CurrencyBlock = styled.div`
  display: flex;
  max-width: 15rem;
  max-height: 7rem;
  align-items: center;
  padding: 0.5rem;
`;
const CurrencyName = styled.h3`
  font-size: 1.25rem;
  color: #fcf2de;
  margin-left: 0.25rem;
`;
const CurrencyValue = styled.h3`
  font-size: 1.25rem;
  color: #fcf2de;
  margin-left: auto;
  margin-right: 0.5rem;
`;

const Image = styled.img`
  max-width: 4rem;
  max-height: 4rem;
`;

const CurrencyBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
