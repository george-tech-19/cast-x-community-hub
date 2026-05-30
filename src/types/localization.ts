/**
 * TypeScript Types & Interfaces for i18n System
 * Comprehensive type definitions for all localization features
 */

// ==================== Geolocation Types ====================

export interface GeolocationData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  isp?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
}

export interface CachedGeolocation {
  data: GeolocationData;
  timestamp: number;
}

// ==================== Currency Types ====================

export interface CurrencySettings {
  code: string;
  symbol: string;
  locale: string;
  name: string;
}

export interface CurrencyFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: 'symbol' | 'code' | 'name';
}

// ==================== Localization Context Types ====================

export interface LocalizationContextType {
  // Language state
  language: string;
  setLanguage: (language: string) => void;

  // Currency state
  currency: CurrencySettings;
  setCurrency: (currency: CurrencySettings) => void;
  clearCurrencyOverride: () => void;

  // Geolocation state
  country: string;
  region: string;
  city: string;
  countryCode: string;

  // Locale and RTL state
  locale: string;
  isRTL: boolean;

  // Loading state
  isLoading: boolean;
  error: string | null;

  // Utilities
  formatCurrency: (amount: number) => string;
  resetPreferences: () => void;
}

// ==================== Formatter Types ====================

export type DateTimeFormatOptions = Intl.DateTimeFormatOptions;
export type NumberFormatOptions = Intl.NumberFormatOptions;
export type RelativeTimeFormatOptions = Intl.RelativeTimeFormatOptions;
export type RelativeTimeFormatUnit = Intl.RelativeTimeFormatUnit;

export interface FormatterOptions {
  locale: string;
  currency?: string;
  minFractionDigits?: number;
  maxFractionDigits?: number;
}

// ==================== i18n Types ====================

export interface TranslationStrings {
  [key: string]: string | TranslationStrings;
}

export interface I18nConfig {
  fallbackLng: string;
  lng: string;
  resources: Record<string, { translation: TranslationStrings }>;
  interpolation: {
    escapeValue: boolean;
  };
  defaultNS: string;
  ns: string[];
  react: {
    useSuspense: boolean;
  };
}

// ==================== Language Types ====================

export type SupportedLanguage =
  | 'en'
  | 'fr'
  | 'es'
  | 'de'
  | 'ar'
  | 'pt'
  | 'it'
  | 'nl'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'tr'
  | 'hi'
  | 'id'
  | 'vi'
  | 'pl'
  | 'sv';

export type RTLLanguage = 'ar' | 'he' | 'fa' | 'ur';

export type TextDirection = 'ltr' | 'rtl';

// ==================== Country Types ====================

export type SupportedCountry =
  | 'US' | 'CA' | 'MX' | 'BR' | 'AR' | 'CL' | 'CO'  // Americas
  | 'GB' | 'FR' | 'DE' | 'ES' | 'IT' | 'NL' | 'BE' | 'CH' | 'SE' | 'NO' | 'DK' | 'PL' | 'RU' | 'UA' | 'TR' | 'CZ' | 'HU' | 'RO' | 'HR' | 'GR' | 'PT' | 'IE' | 'AT'  // Europe
  | 'IN' | 'CN' | 'JP' | 'KR' | 'ID' | 'VN' | 'TH' | 'MY' | 'SG' | 'PH' | 'AU' | 'NZ' | 'TW' | 'HK'  // Asia-Pacific
  | 'AE' | 'SA' | 'QA' | 'KW' | 'EG' | 'NG' | 'ZA' | 'KE' | 'GH' | 'MA' | 'DZ' | 'TN' | 'CM' | 'CI' | 'SN';  // Middle East & Africa

// ==================== RTL Types ====================

export interface RTLConfig {
  languages: RTLLanguage[];
  updateDOM: boolean;
  updateClass: boolean;
}

// ==================== Hook Return Types ====================

export interface UseCurrencyReturn {
  currency: CurrencySettings;
  setCurrency: (currency: CurrencySettings) => void;
  clearCurrencyOverride: () => void;
  formatCurrency: (amount: number, fromCurrency?: string) => string;
  formatPrice: (amount: number) => string;
  formatter: Intl.NumberFormat;
  currencyOptions: Record<string, CurrencySettings>;
  convertFromUSD: (usdAmount: number, targetCurrencyCode: string) => number;
}

export interface UseLocalizationReturn extends LocalizationContextType {}

// ==================== Component Props ====================

export interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export interface CurrencySwitcherProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
  searchable?: boolean;
}

// ==================== Service Return Types ====================

export interface GetGeolocationResult {
  data: GeolocationData | null;
  error: Error | null;
  cached: boolean;
}

// ==================== Error Types ====================

export class GeolocationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'GeolocationError';
  }
}

export class LocalizationError extends Error {
  constructor(message: string, public context?: Record<string, any>) {
    super(message);
    this.name = 'LocalizationError';
  }
}

// ==================== Utility Types ====================

export type Locale = string;
export type CurrencyCode = string;
export type CountryCode = string;

export interface LocaleConfig {
  language: SupportedLanguage;
  country: SupportedCountry;
  currency: CurrencySettings;
  direction: TextDirection;
}

export interface PreferenceStorage {
  language?: SupportedLanguage;
  currency?: CurrencySettings;
  customizations?: Record<string, any>;
}

// ==================== Constants ====================

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'en', 'fr', 'es', 'de', 'ar', 'pt', 'it', 'nl', 'ru', 'zh', 'ja', 'ko', 'tr', 'hi', 'id', 'vi', 'pl', 'sv',
];

export const RTL_LANGUAGES: RTLLanguage[] = ['ar', 'he', 'fa', 'ur'];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
export const DEFAULT_CURRENCY_CODE = 'USD';
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_COUNTRY_CODE = 'US';

export const GEOLOCATION_CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
export const GEOLOCATION_API_TIMEOUT_MS = 5000;
export const GEOLOCATION_MAX_RETRIES = 3;

// ==================== Function Types ====================

export type FormatFunction = (value: any, locale?: string, options?: any) => string;

export type TranslationFunction = (key: string, defaultValue?: string, options?: any) => string;

export type LanguageChangeHandler = (language: SupportedLanguage) => void | Promise<void>;

export type CurrencyChangeHandler = (currency: CurrencySettings) => void | Promise<void>;

export type GeolocationChangeHandler = (data: GeolocationData) => void | Promise<void>;
