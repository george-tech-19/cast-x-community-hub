/**
 * Currency Converter Service
 * Fetches live exchange rates from ExchangeRate-API with intelligent caching
 */

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const CACHE_KEY = 'exchange_rates_cache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Fallback rates - used if API fails or cache is empty
export const FALLBACK_RATES: Record<string, number> = {
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
  XAF: 562.5, // Corrected CFA rate
  XOF: 562.5, // Corrected CFA rate
};

interface CachedRates {
  rates: Record<string, number>;
  timestamp: number;
}

/**
 * Get cached exchange rates from localStorage
 */
const getCachedRates = (): Record<string, number> | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { rates, timestamp } = JSON.parse(cached) as CachedRates;
    const age = Date.now() - timestamp;

    // Check if cache is still valid (younger than CACHE_DURATION)
    if (age < CACHE_DURATION) {
      console.log(`Using cached exchange rates (${Math.floor(age / 1000 / 60)} minutes old)`);
      return rates;
    }
  } catch (error) {
    console.warn('Error reading cached rates:', error);
  }

  return null;
};

/**
 * Save exchange rates to localStorage with timestamp
 */
const setCachedRates = (rates: Record<string, number>): void => {
  try {
    const cacheData: CachedRates = {
      rates,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Error saving rates to cache:', error);
  }
};

/**
 * Fetch fresh exchange rates from ExchangeRate-API
 * Falls back to cached rates if API fails, then to hardcoded fallback rates
 */
export const fetchExchangeRates = async (): Promise<Record<string, number>> => {
  try {
    console.log('Fetching fresh exchange rates from API...');
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.rates) {
      throw new Error('No rates in API response');
    }

    // Save to cache
    setCachedRates(data.rates);
    console.log('Exchange rates fetched and cached successfully');

    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);

    // Try to use cached rates
    const cachedRates = getCachedRates();
    if (cachedRates) {
      console.log('Using cached rates due to API failure');
      return cachedRates;
    }

    // Fall back to hardcoded rates
    console.warn('Using fallback exchange rates');
    return FALLBACK_RATES;
  }
};

/**
 * Get current exchange rates - from cache first, then fetch fresh if expired
 */
export const getExchangeRates = async (): Promise<Record<string, number>> => {
  const cachedRates = getCachedRates();

  if (cachedRates) {
    return cachedRates;
  }

  return fetchExchangeRates();
};

/**
 * Force refresh exchange rates from API
 */
export const refreshExchangeRates = async (): Promise<Record<string, number>> => {
  return fetchExchangeRates();
};
