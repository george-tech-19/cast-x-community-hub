import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '@/context/LocalizationContext';
import { useCurrency, CurrencySettings } from '@/hooks/useCurrency';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CurrencySwitcherProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
  searchable?: boolean;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  className,
  showLabel = true,
  compact = false,
  searchable = true,
}) => {
  const { currency, setCurrency, currencyOptions } = useCurrency();
  const { i18n } = useTranslation();
  const { isRTL } = useLocalization();
  const [searchQuery, setSearchQuery] = useState('');

  const currencyList = useMemo(() => {
    return Object.values(currencyOptions);
  }, [currencyOptions]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) return currencyList;
    
    const query = searchQuery.toLowerCase();
    return currencyList.filter(
      (curr) =>
        curr.code.toLowerCase().includes(query) ||
        curr.name.toLowerCase().includes(query) ||
        curr.symbol.toLowerCase().includes(query)
    );
  }, [currencyList, searchQuery]);

  const displayValue = useMemo(() => {
    return `${currency.code} (${currency.symbol})`;
  }, [currency]);

  const handleCurrencyChange = (code: string) => {
    const selected = Object.values(currencyOptions).find((c) => c.code === code);
    if (selected) {
      setCurrency(selected);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      {showLabel && !compact && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {i18n.t('currency', 'Currency')}:
        </label>
      )}

      <div className="flex items-center gap-2">
        <Select value={currency.code} onValueChange={handleCurrencyChange}>
          <SelectTrigger
            className={`w-auto ${compact ? 'h-9' : 'h-10'} ${isRTL ? 'text-right' : ''}`}
            aria-label="Select currency"
          >
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>

          <SelectContent>
            {searchable && (
              <div className="p-2 pb-0">
                <Input
                  placeholder="Search currencies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8"
                  autoFocus
                />
              </div>
            )}

            <div className={`${searchable ? 'max-h-48 overflow-y-auto' : ''}`}>
              {filteredCurrencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code}>
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{curr.code}</span>
                    <span className="text-sm text-gray-500">
                      ({curr.symbol}) {curr.name}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>

        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {displayValue}
        </span>
      </div>

      {currency.name && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {currency.name}
        </span>
      )}
    </div>
  );
};

export default CurrencySwitcher;
