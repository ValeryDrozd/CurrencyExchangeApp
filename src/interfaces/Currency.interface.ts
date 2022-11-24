export enum Currency {
  AUD = "AUD",
  CZK = "CZK",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  PLN = "PLN",
  UAH = "UAH",
  USD = "USD",
}

export const CurrencyGlyph: Record<Currency, string> = {
  [Currency.AUD]: "A$",
  [Currency.CZK]: "Kč",
  [Currency.EUR]: "€",
  [Currency.GBP]: "£",
  [Currency.JPY]: "¥",
  [Currency.PLN]: "zł",
  [Currency.UAH]: "₴",
  [Currency.USD]: "$",
};

export const CurrencyFlags: Record<Currency, string> = {
  [Currency.AUD]: "Australia_Flag.jpeg",
  [Currency.CZK]: "Czech_Flag.jpeg",
  [Currency.EUR]: "European_Union_Flag.jpeg",
  [Currency.GBP]: "British_Flag.jpeg",
  [Currency.JPY]: "Japanese_Flag.jpeg",
  [Currency.PLN]: "Polish_Flag.jpeg",
  [Currency.UAH]: "Ukrainian_Flag.jpeg",
  [Currency.USD]: "American_Flag.jpeg",
};

export interface CurrencyRate {
  baseCurrency: Currency;
  rates: Record<Currency, number>;
}
