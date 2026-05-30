/**
 * RTL (Right-to-Left) Language Support
 * Manages document direction and language attributes for RTL languages
 */

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

/**
 * Get the text direction for a given language code
 */
export const getDirection = (languageCode: string): 'ltr' | 'rtl' => {
  return RTL_LANGUAGES.includes(languageCode) ? 'rtl' : 'ltr';
};

/**
 * Update the document direction and language
 * Should be called whenever the language changes
 */
export const updateDocumentDirection = (languageCode: string): void => {
  const direction = getDirection(languageCode);
  
  // Update document direction
  document.documentElement.dir = direction;
  
  // Update document language
  document.documentElement.lang = languageCode;
  
  // Add/remove RTL class for CSS-based styling if needed
  if (direction === 'rtl') {
    document.documentElement.classList.add('rtl');
    document.documentElement.classList.remove('ltr');
  } else {
    document.documentElement.classList.add('ltr');
    document.documentElement.classList.remove('rtl');
  }
  
  // Store in sessionStorage for reference
  sessionStorage.setItem('currentDirection', direction);
};

/**
 * Initialize RTL support with a starting language
 */
export const initializeRTLSupport = (languageCode: string): void => {
  updateDocumentDirection(languageCode);
};

/**
 * Get current text direction
 */
export const getCurrentDirection = (): 'ltr' | 'rtl' => {
  const stored = sessionStorage.getItem('currentDirection');
  return (stored as 'ltr' | 'rtl') || 'ltr';
};

/**
 * Check if current language is RTL
 */
export const isRTL = (languageCode?: string): boolean => {
  const lang = languageCode || document.documentElement.lang || 'en';
  return RTL_LANGUAGES.includes(lang);
};
