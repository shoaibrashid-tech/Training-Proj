import React from 'react';
import { Select } from 'antd';
import { useLocale } from '../../Utils/LocaleContext';
const CURRENCY_CONFIG = {
  USD: { label: 'USD ($)', locale: 'en-US' },
  PKR: { label: 'PKR (₨)', locale: 'ur-PK' },
};

const CurrencySelector = ({ width = 120 }) => {
  const { currency, setCurrency, setLocale } = useLocale();

  const handleChange = (value) => {
    setCurrency(value);
    
    const newLocale = CURRENCY_CONFIG[value]?.locale || 'en-US';
    setLocale(newLocale);
  };

  return (
    <Select
      value={currency}
      onChange={handleChange}
      style={{ width: width }}
      options={Object.entries(CURRENCY_CONFIG).map(([value, config]) => ({
        value: value,
        label: config.label,
      }))}
    />
  );
};

export default CurrencySelector;