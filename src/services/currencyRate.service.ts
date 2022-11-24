import { Currency, CurrencyRate } from "../interfaces/Currency.interface";

const baseUrl = "https://api.apilayer.com/exchangerates_data/latest";

const mapCurrencyRateFromApi = (obj: Record<string, any>): CurrencyRate => {
  return {
    baseCurrency: obj.base,
    rates: { ...obj.rates, [obj.base]: 1 },
  };
};
export const getCurrencyRate = async (
  base: Currency = Currency.UAH
): Promise<CurrencyRate> => {
  const urlParams = new URLSearchParams();
  urlParams.append(
    "symbols",
    Object.values(Currency)
      .filter((currency) => currency !== base)
      .join(",")
  );
  urlParams.append("base", base);
  const url = new URL(`${baseUrl}?${urlParams.toString()}`);
  const res = await fetch(url, {
    headers: {
      apikey: process.env.REACT_APP_CURRENCY_RATE_API_KEY || "",
    },
  });
  if (!res.ok) {
    throw new Error("Invalid currency");
  }
  const obj = await res.json();
  return mapCurrencyRateFromApi(obj);
};
