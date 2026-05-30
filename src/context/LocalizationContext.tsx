import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { GeolocationData, getGeolocation, getCachedGeolocationSync } from '@/services/geolocation';
import { useCurrency, CurrencySettings } from '@/hooks/useCurrency';
import { updateDocumentDirection } from '@/lib/rtl';

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
  formatPrice: (value: number) => string;
  formatCurrency: (amount: number) => string;
  convertFromUSD: (usdAmount: number, targetCurrencyCode: string) => number;
  resetPreferences: () => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  
  const [language, setLanguageState] = useState<string>(i18n.language);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);

  const {
    currency,
    setCurrency,
    clearCurrencyOverride,
    formatCurrency,
    convertFromUSD,
  } = useCurrency(geolocation?.countryCode, language);

  // Initialize geolocation on mount
  useEffect(() => {
    const initializeGeolocation = async () => {
      try {
        setIsLoading(true);
        
        // Check for user preference first (stored currency override)
        const storedLanguage = localStorage.getItem('i18n_language');
        const userPreferredCurrency = localStorage.getItem('currency_override');
        
        // Try to get cached data first
        const cached = getCachedGeolocationSync();
        if (cached) {
          setGeolocation(cached);
          return;
        }

        // Fetch fresh geolocation data
        const data = await getGeolocation();
        setGeolocation(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch geolocation';
        console.warn('Geolocation error, using fallback:', errorMessage);
        
        // Set default geolocation if fetch fails - use browser language as fallback
        const browserLang = navigator.language || 'en';
        const langCode = browserLang.split('-')[0] || 'en';
        
        setGeolocation({
          country: '',
          countryCode: langCode.toUpperCase(),
          region: '',
          city: '',
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeGeolocation();
  }, []);

  // Handle language changes
  const setLanguage = useCallback(
    (newLanguage: string) => {
      i18n.changeLanguage(newLanguage);
      setLanguageState(newLanguage);
      updateDocumentDirection(newLanguage);
      localStorage.setItem('i18n_language', newLanguage);
    },
    [i18n]
  );

  // Reset all preferences
  const resetPreferences = useCallback(() => {
    setLanguage('en');
    clearCurrencyOverride();
    localStorage.removeItem('currency_override');
  }, [setLanguage, clearCurrencyOverride]);

  // Update RTL support when language changes
  useEffect(() => {
    updateDocumentDirection(language);
  }, [language]);

  const isRTL = ['ar', 'he', 'fa', 'ur'].includes(language);

  const value: LocalizationContextType = {
    // Language
    language,
    setLanguage,

    // Currency
    currency,
    setCurrency,
    clearCurrencyOverride,

    // Geolocation
    country: geolocation?.country || '',
    region: geolocation?.region || '',
    city: geolocation?.city || '',
    countryCode: geolocation?.countryCode || 'US',

    // Locale and RTL
    locale: language,
    isRTL,

    // Loading and error states
    isLoading,
    error,

    // Utilities
    formatPrice: (value: number) => formatCurrency(value, 'USD'),
    formatCurrency: (amount: number) => formatCurrency(amount, 'USD'),
    convertFromUSD,
    resetPreferences,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

export default LocalizationContext;
