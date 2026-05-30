import { useCallback, useEffect, useMemo, useState } from 'react';

export interface CurrencySettings {
  code: string;
  symbol: string;
  locale: string;
  name: string;
}

// Comprehensive country to currency mapping (50+ countries)
/**
 * Approximate exchange rates: how many units of foreign currency equal 1 USD
 * Rates updated as of early 2024 - should be refreshed periodically or fetched from API
 */
const EXCHANGE_RATES_TO_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  NZD: 1.65,
  MXN: 18.92,
  BRL: 5.21,
  ARS: 884.10,
  CLP: 947.32,
  COP: 4207.69,
  CHF: 0.91,
  SEK: 10.85,
  NOK: 10.63,
  DKK: 7.46,
  PLN: 3.89,
  CZK: 22.26,
  HUF: 373.82,
  RON: 4.58,
  TRY: 32.07,
  RUB: 92.76,
  UAH: 41.12,
  INR: 83.42,
  CNY: 7.25,
  JPY: 152.87,
  KRW: 1377.50,
  IDR: 16177.50,
  VND: 25350.00,
  THB: 36.50,
  MYR: 4.75,
  SGD: 1.35,
  PHP: 59.50,
  TWD: 32.00,
  HKD: 7.82,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  EGP: 47.83,
  NGN: 1562.50,
  ZAR: 18.50,
  KES: 130.00,
  GHS: 14.80,
  MAD: 10.12,
  DZD: 133.50,
  TND: 3.07,
  XAF: 615.00,
  XOF: 615.00,
};

const COUNTRY_CURRENCY_MAP: Record<string, CurrencySettings> = {
  // Americas
  US: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  CA: { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar' },
  MX: { code: 'MXN', symbol: '$', locale: 'es-MX', name: 'Mexican Peso' },
  BR: { code: 'BRL', symbol: 'R$', locale: 'pt-BR', name: 'Brazilian Real' },
  AR: { code: 'ARS', symbol: '$', locale: 'es-AR', name: 'Argentine Peso' },
  CL: { code: 'CLP', symbol: '$', locale: 'es-CL', name: 'Chilean Peso' },
  CO: { code: 'COP', symbol: '$', locale: 'es-CO', name: 'Colombian Peso' },

  // Europe
  GB: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  FR: { code: 'EUR', symbol: '€', locale: 'fr-FR', name: 'Euro' },
  DE: { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  ES: { code: 'EUR', symbol: '€', locale: 'es-ES', name: 'Euro' },
  IT: { code: 'EUR', symbol: '€', locale: 'it-IT', name: 'Euro' },
  NL: { code: 'EUR', symbol: '€', locale: 'nl-NL', name: 'Euro' },
  BE: { code: 'EUR', symbol: '€', locale: 'fr-BE', name: 'Euro' },
  CH: { code: 'CHF', symbol: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  SE: { code: 'SEK', symbol: 'kr', locale: 'sv-SE', name: 'Swedish Krona' },
  NO: { code: 'NOK', symbol: 'kr', locale: 'nb-NO', name: 'Norwegian Krone' },
  DK: { code: 'DKK', symbol: 'kr', locale: 'da-DK', name: 'Danish Krone' },
  PL: { code: 'PLN', symbol: 'zł', locale: 'pl-PL', name: 'Polish Zloty' },
  RU: { code: 'RUB', symbol: '₽', locale: 'ru-RU', name: 'Russian Ruble' },
  UA: { code: 'UAH', symbol: '₴', locale: 'uk-UA', name: 'Ukrainian Hryvnia' },
  TR: { code: 'TRY', symbol: '₺', locale: 'tr-TR', name: 'Turkish Lira' },
  CZ: { code: 'CZK', symbol: 'Kč', locale: 'cs-CZ', name: 'Czech Koruna' },
  HU: { code: 'HUF', symbol: 'Ft', locale: 'hu-HU', name: 'Hungarian Forint' },
  RO: { code: 'RON', symbol: 'lei', locale: 'ro-RO', name: 'Romanian Leu' },
  HR: { code: 'EUR', symbol: '€', locale: 'hr-HR', name: 'Euro' },
  GR: { code: 'EUR', symbol: '€', locale: 'el-GR', name: 'Euro' },
  PT: { code: 'EUR', symbol: '€', locale: 'pt-PT', name: 'Euro' },
  IE: { code: 'EUR', symbol: '€', locale: 'en-IE', name: 'Euro' },
  AT: { code: 'EUR', symbol: '€', locale: 'de-AT', name: 'Euro' },

  // Asia-Pacific
  IN: { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
  CN: { code: 'CNY', symbol: '¥', locale: 'zh-CN', name: 'Chinese Yuan' },
  JP: { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen' },
  KR: { code: 'KRW', symbol: '₩', locale: 'ko-KR', name: 'South Korean Won' },
  ID: { code: 'IDR', symbol: 'Rp', locale: 'id-ID', name: 'Indonesian Rupiah' },
  VN: { code: 'VND', symbol: '₫', locale: 'vi-VN', name: 'Vietnamese Dong' },
  TH: { code: 'THB', symbol: '฿', locale: 'th-TH', name: 'Thai Baht' },
  MY: { code: 'MYR', symbol: 'RM', locale: 'ms-MY', name: 'Malaysian Ringgit' },
  SG: { code: 'SGD', symbol: 'S$', locale: 'en-SG', name: 'Singapore Dollar' },
  PH: { code: 'PHP', symbol: '₱', locale: 'fil-PH', name: 'Philippine Peso' },
  AU: { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar' },
  NZ: { code: 'NZD', symbol: 'NZ$', locale: 'en-NZ', name: 'New Zealand Dollar' },
  TW: { code: 'TWD', symbol: 'NT$', locale: 'zh-TW', name: 'Taiwan Dollar' },
  HK: { code: 'HKD', symbol: 'HK$', locale: 'zh-HK', name: 'Hong Kong Dollar' },

  // Middle East & Africa
  AE: { code: 'AED', symbol: 'د.إ', locale: 'ar-AE', name: 'UAE Dirham' },
  SA: { code: 'SAR', symbol: '﷼', locale: 'ar-SA', name: 'Saudi Riyal' },
  QA: { code: 'QAR', symbol: '﷼', locale: 'ar-QA', name: 'Qatari Riyal' },
  KW: { code: 'KWD', symbol: 'د.ك', locale: 'ar-KW', name: 'Kuwaiti Dinar' },
  EG: { code: 'EGP', symbol: '£', locale: 'ar-EG', name: 'Egyptian Pound' },
  NG: { code: 'NGN', symbol: '₦', locale: 'en-NG', name: 'Nigerian Naira' },
  ZA: { code: 'ZAR', symbol: 'R', locale: 'en-ZA', name: 'South African Rand' },
  KE: { code: 'KES', symbol: 'Sh', locale: 'en-KE', name: 'Kenyan Shilling' },
  GH: { code: 'GHS', symbol: '₵', locale: 'en-GH', name: 'Ghanaian Cedi' },
  MA: { code: 'MAD', symbol: 'د.م.', locale: 'ar-MA', name: 'Moroccan Dirham' },
  DZ: { code: 'DZD', symbol: 'د.ج', locale: 'ar-DZ', name: 'Algerian Dinar' },
  TN: { code: 'TND', symbol: 'د.ت', locale: 'ar-TN', name: 'Tunisian Dinar' },
  CM: { code: 'XAF', symbol: 'FCFA', locale: 'fr-CM', name: 'CFA Franc BEAC' },
  CI: { code: 'XOF', symbol: 'CFA', locale: 'fr-CI', name: 'CFA Franc BCEAO' },
  SN: { code: 'XOF', symbol: 'CFA', locale: 'fr-SN', name: 'CFA Franc BCEAO' },
};

const DEFAULT_CURRENCY: CurrencySettings = {
  code: 'USD',
  symbol: '$',
  locale: 'en-US',
  name: 'US Dollar',
};

const CURRENCY_LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  ar: 'ar-SA',
  pt: 'pt-BR',
  it: 'it-IT',
  nl: 'nl-NL',
  ru: 'ru-RU',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  tr: 'tr-TR',
  hi: 'en-IN',
  id: 'id-ID',
  vi: 'vi-VN',
  pl: 'pl-PL',
  sv: 'sv-SE',
};

type CurrencyOverride = Record<string, CurrencySettings>;

export const useCurrency = (countryCode?: string, language?: string) => {
  const [currency, setCurrency] = useState<CurrencySettings>(DEFAULT_CURRENCY);
  const [overrideCurrency, setOverrideCurrency] = useState<CurrencySettings | null>(null);

  // Load persisted override on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('currency_override');
      if (stored) {
        setOverrideCurrency(JSON.parse(stored) as CurrencySettings);
      }
    } catch (error) {
      console.warn('Error loading currency override:', error);
    }
  }, []);

  // Update currency when country or language changes
  useEffect(() => {
    let selected = DEFAULT_CURRENCY;

    // Priority 1: User-selected override
    if (overrideCurrency) {
      selected = overrideCurrency;
    }
    // Priority 2: Country-based currency
    else if (countryCode && COUNTRY_CURRENCY_MAP[countryCode]) {
      selected = COUNTRY_CURRENCY_MAP[countryCode];
    }
    // Priority 3: Language-based currency
    else if (language && CURRENCY_LOCALE_MAP[language]) {
      const locale = CURRENCY_LOCALE_MAP[language];
      const langCountry = locale.split('-')[1];
      if (langCountry && COUNTRY_CURRENCY_MAP[langCountry]) {
        selected = COUNTRY_CURRENCY_MAP[langCountry];
      }
    }
    // Priority 4: Default USD

    setCurrency(selected);
  }, [countryCode, language, overrideCurrency]);

  const setManualCurrency = useCallback(
    (newCurrency: CurrencySettings) => {
      setOverrideCurrency(newCurrency);
      try {
        localStorage.setItem('currency_override', JSON.stringify(newCurrency));
      } catch (error) {
        console.warn('Error saving currency override:', error);
      }
    },
    []
  );

  const clearOverride = useCallback(() => {
    setOverrideCurrency(null);
    try {
      localStorage.removeItem('currency_override');
    } catch (error) {
      console.warn('Error clearing currency override:', error);
    }
  }, []);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
      }),
    [currency]
  );

  const getExchangeRate = useCallback((targetCurrencyCode: string): number => {
    const rate = EXCHANGE_RATES_TO_USD[targetCurrencyCode];
    return rate || 1;
  }, []);

  const convertFromUSD = useCallback(
    (usdAmount: number, targetCurrencyCode: string): number => {
      const rate = getExchangeRate(targetCurrencyCode);
      return usdAmount * rate;
    },
    [getExchangeRate]
  );

  const formatCurrency = useCallback(
    (amount: number, fromCurrency: string = 'USD'): string => {
      const convertedAmount = fromCurrency === 'USD' ? convertFromUSD(amount, currency.code) : amount;
      return formatter.format(convertedAmount);
    },
    [formatter, convertFromUSD, currency.code]
  );

  const formatPrice = useCallback(
    (amount: number): string => {
      const convertedAmount = convertFromUSD(amount, currency.code);
      return formatter.format(convertedAmount);
    },
    [formatter, convertFromUSD, currency.code]
  );

  return {
    currency,
    setCurrency: setManualCurrency,
    clearCurrencyOverride: clearOverride,
    formatCurrency,
    formatPrice,
    formatter,
    currencyOptions: COUNTRY_CURRENCY_MAP,
    convertFromUSD,
  };
};

export default useCurrency;
