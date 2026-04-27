export const formatCurrency = (amount, currency, locale) => {
  if (amount === undefined || amount === null) return '-';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const exchangeRates = {
  USD: 1,
  PKR: 280, 
};