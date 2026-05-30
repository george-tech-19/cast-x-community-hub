/**
 * Localization Formatters
 * Provides locale-aware formatting functions using Intl APIs
 */

/**
 * Format currency with locale awareness
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

/**
 * Format price with locale and currency (alias for formatCurrency)
 */
export const formatPrice = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string => {
  return formatCurrency(amount, locale, currency);
};

/**
 * Format number with locale awareness
 */
export const formatNumber = (
  value: number,
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {}
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  });
  return formatter.format(value);
};

/**
 * Format date with locale awareness
 */
export const formatDate = (
  date: Date | number | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  const formatter = new Intl.DateTimeFormat(locale, defaultOptions);
  return formatter.format(dateObj);
};

/**
 * Format date in short format (e.g., "12/25/2024")
 */
export const formatDateShort = (
  date: Date | number | string,
  locale: string = 'en-US'
): string => {
  return formatDate(date, locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format date in long format (e.g., "December 25, 2024")
 */
export const formatDateLong = (
  date: Date | number | string,
  locale: string = 'en-US'
): string => {
  return formatDate(date, locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format time with locale awareness
 */
export const formatTime = (
  date: Date | number | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...options,
  };

  const formatter = new Intl.DateTimeFormat(locale, defaultOptions);
  return formatter.format(dateObj);
};

/**
 * Format date and time together
 */
export const formatDateTime = (
  date: Date | number | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  const formatter = new Intl.DateTimeFormat(locale, defaultOptions);
  return formatter.format(dateObj);
};

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 * Requires modern browser or polyfill
 */
export const formatRelativeTime = (
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: string = 'en-US',
  options: Intl.RelativeTimeFormatOptions = {}
): string => {
  if (!Intl.RelativeTimeFormat) {
    console.warn('Intl.RelativeTimeFormat not supported');
    return `${value} ${unit}s`;
  }

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    ...options,
  });
  return formatter.format(value, unit);
};

/**
 * Get relative time from a date (e.g., "2 days ago")
 */
export const getRelativeTime = (
  date: Date | number | string,
  locale: string = 'en-US'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);

  if (diffSecs < 60) {
    return formatRelativeTime(-diffSecs, 'second', locale);
  }
  
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) {
    return formatRelativeTime(-diffMins, 'minute', locale);
  }
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return formatRelativeTime(-diffHours, 'hour', locale);
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return formatRelativeTime(-diffDays, 'day', locale);
  }
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return formatRelativeTime(-diffMonths, 'month', locale);
  }
  
  const diffYears = Math.floor(diffMonths / 12);
  return formatRelativeTime(-diffYears, 'year', locale);
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  locale: string = 'en-US',
  decimalPlaces: number = 2
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
  return formatter.format(value / 100);
};

/**
 * List formatter with locale awareness (e.g., "item1, item2, and item3")
 */
export const formatList = (
  items: string[],
  locale: string = 'en-US',
  type: 'conjunction' | 'disjunction' | 'unit' = 'conjunction'
): string => {
  if (!Intl.ListFormat) {
    return items.join(', ');
  }

  const formatter = new Intl.ListFormat(locale, {
    type,
    style: 'long',
  });
  return formatter.format(items);
};

/**
 * Display name in locale (e.g., language name, country name)
 */
export const formatDisplayName = (
  code: string,
  type: 'language' | 'region' | 'currency' | 'calendar' | 'dateTimeField' = 'language',
  locale: string = 'en-US'
): string => {
  if (!Intl.DisplayNames) {
    return code;
  }

  try {
    const formatter = new Intl.DisplayNames(locale, { type });
    return formatter.of(code) || code;
  } catch (error) {
    console.warn(`Error formatting display name for ${code}:`, error);
    return code;
  }
};

/**
 * Format bytes to human-readable size (e.g., "1.5 MB")
 */
export const formatBytes = (
  bytes: number,
  locale: string = 'en-US',
  decimals: number = 2
): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const value = bytes / Math.pow(k, i);
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: dm,
    maximumFractionDigits: dm,
  });

  return `${formatter.format(value)} ${sizes[i]}`;
};

/**
 * Collation support for sorting strings
 */
export const createCollator = (locale: string = 'en-US', options: Intl.CollatorOptions = {}) => {
  return new Intl.Collator(locale, {
    numeric: true,
    sensitivity: 'base',
    ...options,
  });
};

/**
 * Sort array of strings using locale-aware collation
 */
export const sortLocaleAware = (
  items: string[],
  locale: string = 'en-US',
  descending: boolean = false
): string[] => {
  const collator = createCollator(locale);
  const sorted = [...items].sort((a, b) => collator.compare(a, b));
  return descending ? sorted.reverse() : sorted;
};
