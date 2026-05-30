/**
 * IP Geolocation Service
 * Uses ipapi.co (primary) and ipwho.is (fallback) to detect user location
 * Implements caching with localStorage (24-hour expiry)
 */

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

const GEOLOCATION_CACHE_KEY = 'geolocation_cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const API_URL = 'https://ipapi.co/json/';
const FALLBACK_API_URL = 'https://ipwho.is/';
const TIMEOUT_MS = 5000;

/**
 * Get cached geolocation data if available and not expired
 */
const getCachedGeolocation = (): GeolocationData | null => {
  try {
    const cached = localStorage.getItem(GEOLOCATION_CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached) as CachedGeolocation;
    const isExpired = Date.now() - timestamp > CACHE_EXPIRY_MS;

    if (isExpired) {
      localStorage.removeItem(GEOLOCATION_CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Error reading geolocation cache:', error);
    return null;
  }
};

/**
 * Cache geolocation data
 */
const cacheGeolocation = (data: GeolocationData): void => {
  try {
    const cacheData: CachedGeolocation = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Error caching geolocation:', error);
  }
};

/**
 * Fetch geolocation data from IP-API
 */
const fetchGeolocationFromAPI = async (): Promise<GeolocationData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Geolocation API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response has required fields
    if (!data.country_name || !data.country_code) {
      throw new Error('Invalid geolocation response: missing required fields');
    }

    const geolocation: GeolocationData = {
      country: data.country_name,
      countryCode: data.country_code,
      region: data.region || '',
      city: data.city || '',
    };

    return geolocation;
  } catch (primaryError) {
    console.warn('Error fetching geolocation from primary API:', primaryError);
    
    // Try fallback API
    try {
      const fallbackResponse = await fetch(FALLBACK_API_URL, { signal: controller.signal });
      
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback Geolocation API error: ${fallbackResponse.statusText}`);
      }
      
      const fallbackData = await fallbackResponse.json();
      
      if (!fallbackData.country || !fallbackData.country_code) {
        throw new Error('Invalid fallback geolocation response: missing required fields');
      }
      
      const geolocation: GeolocationData = {
        country: fallbackData.country,
        countryCode: fallbackData.country_code,
        region: fallbackData.region || '',
        city: fallbackData.city || '',
      };
      
      return geolocation;
    } catch (fallbackError) {
      console.error('Error fetching geolocation from fallback API:', fallbackError);
      throw primaryError; // Throw original error to maintain consistent error message
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Get browser locale as fallback
 */
const getBrowserLocaleFallback = (): GeolocationData => {
  const browserLang = navigator.language || 'en-US';
  const langParts = browserLang.split('-');
  const countryCode = langParts[1] || 'US';
  
  return {
    country: '', // Will be resolved via currency map if available
    countryCode,
    region: '',
    city: '',
  };
};

/**
 * Get user's geolocation
 * Returns cached data if available, otherwise fetches from API, with browser locale fallback
 */
export const getGeolocation = async (): Promise<GeolocationData> => {
  // Check cache first
  const cached = getCachedGeolocation();
  if (cached) {
    return cached;
  }

  // Fetch from API with fallback
  try {
    const data = await fetchGeolocationFromAPI();
    // Cache the result
    cacheGeolocation(data);
    return data;
  } catch (error) {
    console.warn('Geolocation fetch failed, using browser locale fallback');
    // Return browser locale fallback instead of throwing
    return getBrowserLocaleFallback();
  }
};

/**
 * Clear cached geolocation
 */
export const clearGeolocationCache = (): void => {
  localStorage.removeItem(GEOLOCATION_CACHE_KEY);
};

/**
 * Get cached geolocation synchronously (for initialization)
 */
export const getCachedGeolocationSync = (): GeolocationData | null => {
  return getCachedGeolocation();
};
