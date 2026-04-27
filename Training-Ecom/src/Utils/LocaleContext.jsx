import React, { createContext, useContext, useState, useEffect } from 'react';

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('app-currency') || 'USD';
  });

  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('app-locale') || navigator.language || 'en-US';
  });

  useEffect(() => {
    localStorage.setItem('app-currency', currency);
    localStorage.setItem('app-locale', locale);
  }, [currency, locale]);

  return (
    <LocaleContext.Provider value={{ currency, setCurrency, locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);