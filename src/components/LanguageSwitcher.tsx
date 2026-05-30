import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '@/context/LocalizationContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDisplayName } from '@/utils/formatters';

// Map of language codes to native names
const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
  pt: 'Português',
  it: 'Italiano',
  nl: 'Nederlands',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  tr: 'Türkçe',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  pl: 'Polski',
  sv: 'Svenska',
};

const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_NAMES);

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  showLabel = true,
  compact = false,
}) => {
  const { language, setLanguage, isRTL } = useLocalization();
  const { i18n } = useTranslation();

  const displayLabel = useMemo(() => {
    return LANGUAGE_NAMES[language] || language;
  }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      {showLabel && !compact && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {i18n.t('language', 'Language')}:
        </label>
      )}
      
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger
          className={`w-auto ${compact ? 'h-9' : 'h-10'} ${isRTL ? 'text-right' : ''}`}
          aria-label="Select language"
        >
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        
        <SelectContent>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              <span>{LANGUAGE_NAMES[lang]}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
