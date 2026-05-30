# i18n Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies (Already Done ✅)

```bash
bun install
```

### 2. Import & Use in Your Components

#### Translate UI Text
```tsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('welcome')}</h1>;
}
```

#### Access Localization State
```tsx
import { useLocalization } from '@/context/LocalizationContext';

export default function Info() {
  const { language, currency, country, formatCurrency } = useLocalization();
  
  return (
    <div>
      <p>Language: {language}</p>
      <p>Currency: {currency.code}</p>
      <p>Country: {country}</p>
      <p>Price: {formatCurrency(99.99)}</p>
    </div>
  );
}
```

#### Add Language Switcher
```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  return <LanguageSwitcher />;
}
```

#### Add Currency Switcher
```tsx
import CurrencySwitcher from '@/components/CurrencySwitcher';

export default function Settings() {
  return <CurrencySwitcher />;
}
```

## Common Tasks

### Format Currency
```tsx
import { useLocalization } from '@/context/LocalizationContext';

const { formatCurrency } = useLocalization();
console.log(formatCurrency(100)); // $100.00 (depends on locale)
```

### Format Date
```tsx
import { formatDate } from '@/utils/formatters';

const date = formatDate(new Date(), 'en-US');
console.log(date); // December 25, 2024
```

### Get User Location
```tsx
import { useLocalization } from '@/context/LocalizationContext';

const { country, region, city, countryCode } = useLocalization();
console.log(`${city}, ${region}, ${country}`);
```

### Change Language Programmatically
```tsx
import { useLocalization } from '@/context/LocalizationContext';

const { setLanguage } = useLocalization();

// Change to Spanish
setLanguage('es');
```

### Change Currency Programmatically
```tsx
import { useLocalization } from '@/context/LocalizationContext';

const { setCurrency } = useLocalization();

// Change to EUR
setCurrency({
  code: 'EUR',
  symbol: '€',
  locale: 'en-IE',
  name: 'Euro',
});
```

## Translation Keys (100+ Available)

Common keys available in all 18 languages:

```
welcome, welcome_message, language, currency, country, region, city
add_to_cart, remove_from_cart, cart, checkout, products, price
search, filter, sort, categories, category, brand, brands, rating
date, time, total, subtotal, tax, shipping, discount
login, logout, register, account, profile, settings, preferences
about, contact, help, home, community, share, like, comment
success, error, warning, loading, confirmation, cancel, save, delete
```

Plus 80+ more - see [src/locales/en/translation.json](src/locales/en/translation.json)

## File Structure

```
src/
├── lib/
│   ├── i18n.ts              ← i18next setup
│   └── rtl.ts               ← RTL support
├── services/
│   └── geolocation.ts       ← Location detection
├── hooks/
│   └── useCurrency.ts       ← Currency management
├── context/
│   └── LocalizationContext  ← Global state
├── components/
│   ├── LanguageSwitcher     ← Language selector
│   └── CurrencySwitcher     ← Currency selector
├── utils/
│   └── formatters.ts        ← Formatting utilities
└── locales/
    ├── en/translation.json
    ├── fr/translation.json
    ├── es/translation.json
    └── ... (18 languages total)
```

## Testing in Development

### Change Language
1. Open DevTools Console
2. Run: `localStorage.setItem('i18n_language', 'es')`
3. Refresh page → UI now in Spanish

### Check Geolocation
1. Open DevTools Console
2. Run: `JSON.parse(localStorage.getItem('geolocation_cache'))`
3. See your detected country, region, city

### Clear All Preferences
1. Open DevTools Console
2. Run: `localStorage.clear()`
3. Refresh page → App resets to defaults

## Supported Languages

```
🇺🇸 English (en)
🇫🇷 French (fr)
🇪🇸 Spanish (es)
🇩🇪 German (de)
🇸🇦 Arabic (ar) ← RTL
🇵🇹 Portuguese (pt)
🇮🇹 Italian (it)
🇳🇱 Dutch (nl)
🇷🇺 Russian (ru)
🇨🇳 Chinese (zh)
🇯🇵 Japanese (ja)
🇰🇷 Korean (ko)
🇹🇷 Turkish (tr)
🇮🇳 Hindi (hi)
🇮🇩 Indonesian (id)
🇻🇳 Vietnamese (vi)
🇵🇱 Polish (pl)
🇸🇪 Swedish (sv)
```

## Available Formatters

```typescript
// Numbers
formatNumber(1234.567, 'en-US') → "1,234.57"

// Currency
formatCurrency(100, 'en-US', 'USD') → "$100.00"

// Dates
formatDate(new Date(), 'en-US') → "December 25, 2024"
formatDateShort(new Date(), 'en-US') → "12/25/2024"
formatDateLong(new Date(), 'en-US') → "Thursday, December 25, 2024"

// Time
formatTime(new Date(), 'en-US') → "02:30:45 PM"

// DateTime
formatDateTime(new Date(), 'en-US') → "December 25, 2024 02:30 PM"

// Relative Time
formatRelativeTime(-2, 'day', 'en-US') → "2 days ago"
getRelativeTime(new Date(Date.now() - 7200000)) → "2 hours ago"

// Percentage
formatPercentage(75, 'en-US') → "75%"

// Bytes
formatBytes(1048576, 'en-US') → "1 MB"

// Lists
formatList(['a', 'b', 'c'], 'en-US') → "a, b, and c"
```

## Troubleshooting

### Language not changing?
- Check: `document.documentElement.lang`
- Clear localStorage: `localStorage.clear()`
- Refresh page

### RTL not working?
- Check: `document.documentElement.dir`
- Verify language is Arabic or other RTL language
- Check CSS supports RTL (`dir="rtl"`)

### Currency not showing?
- Verify country code in console: `localStorage.getItem('geolocation_cache')`
- Check currency mapping in `src/hooks/useCurrency.ts`

### Geolocation failing?
- Check internet connection
- Open DevTools console to see error
- App still works - defaults to US/English/USD
- Check ip-api.com is accessible

## Performance Tips

1. ✅ Use `useTranslation()` hook - it's optimized
2. ✅ Memoize heavy formatting operations
3. ✅ Don't format in render - use useCallback
4. ✅ Geolocation caches for 24 hours automatically
5. ✅ Language/currency preferences auto-persist

## Production Checklist

- [ ] Test all 18 languages
- [ ] Test RTL layout with Arabic
- [ ] Test on mobile devices
- [ ] Test offline (geolocation might fail - OK)
- [ ] Test with VPN (geolocation might show VPN location)
- [ ] Update translation files with your content
- [ ] Add more countries if needed
- [ ] Customize component styling
- [ ] Test localStorage quota limits

## Resources

- Full Documentation: [I18N_DOCUMENTATION.md](I18N_DOCUMENTATION.md)
- Type Definitions: [src/types/localization.ts](src/types/localization.ts)
- i18next Docs: https://www.i18next.com/
- Intl Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

---

Happy translating! 🌍
