import { createContext, useCallback, useContext, useState } from 'react';

export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', sym: '$', rate: 1 },
  { code: 'GBP', label: 'British Pound', sym: '£', rate: 0.79 },
  { code: 'EUR', label: 'Euro', sym: '€', rate: 0.92 },
  { code: 'AED', label: 'UAE Dirham', sym: 'AED\u00A0', rate: 3.67 },
  { code: 'INR', label: 'Indian Rupee', sym: '₹', rate: 83.5 }
];
const INTL_MARKUP = 1.08; // est. duties + insured international shipping
const STORE_KEY = 'bougie_currency';

function byCode(code) {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState(() => localStorage.getItem(STORE_KEY) || 'USD');
  const setCurrency = useCallback((c) => {
    localStorage.setItem(STORE_KEY, c);
    setCode(c);
  }, []);
  const currency = byCode(code);

  function roundNice(v) { return v >= 1000 ? Math.round(v / 5) * 5 : Math.round(v); }
  function fmt(usd) { return currency.sym + roundNice(usd * currency.rate).toLocaleString('en-US'); }
  function fmtIntl(usd) { return fmt(usd * INTL_MARKUP); }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, CURRENCIES, fmt, fmtIntl }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
