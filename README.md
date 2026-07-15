# CAST-X Community Hub

CAST-X Community Hub is a modern React + Vite storefront built around a premium streetwear concept. It combines a polished ecommerce experience with community discovery, brand positioning, and localized shopping behavior.

The app is designed to feel like a marketing storefront and product catalog, while also supporting:
- user location-aware pricing,
- multi-lingual UI,
- persistent cart state,
- product variants,
- a direct checkout flow through WhatsApp or email.

## What this project implements

| Area | Implemented features |
|---|---|
| Product catalog | Filterable product categories, responsive grid layout, featured products, and detail pages |
| Cart | Persistent shopping cart, quantity controls, subtotal calculation, and cart item state tracking |
| Localization | Multi-language UI, RTL support, persistent language selection, and locale-aware formatting |
| Currency | Country-based currency inference, manual override, exchange rate fetching, and fallback rates |
| Checkout | WhatsApp and email order submission with prefilled cart summaries |
| UI | Tailwind + Radix components, toast notifications, skeleton loaders, responsive navigation |

### Product experience
- A curated catalog of branded streetwear items defined in `src/lib/products.ts`.
- Product cards with image carousel, discount badge, price formatting, and quick action buttons.
- Category filtering, sort controls, and grid layout toggles on the Products page.
- Full product detail page with multiple images, size and color selectors, product features list, and buy/remove actions.
- Featured products shown on the homepage.

### Cart and checkout flow
- Global cart context with add/remove/update functionality defined in `src/context/CartContext.tsx`.
- Cart persistence in `localStorage`, preserving user selections across refreshes.
- Quantity controls, subtotal calculation, and discount-aware totals.
- Cart summary page with order details and finalization options.
- Finalize purchase buttons build a message payload and open WhatsApp or email using the user's selected items.

### Localization and internationalization
- `react-i18next` setup in `src/lib/i18n.ts` with support for 16+ languages.
- Language detector uses localStorage first, then browser preferences.
- Language switcher UI in `src/components/LanguageSwitcher.tsx`.
- Right-to-left support via `src/lib/rtl.ts` for languages like Arabic.
- Localized interface labels, buttons, and page text.

### Geolocation and currency conversion
- Geolocation helper in `src/services/geolocation.ts` that fetches IP-based location data and caches it.
- User country detection feeds currency selection and discount logic.
- Currency hook in `src/hooks/useCurrency.ts` that chooses currency by:
  1. user override,
  2. country code,
  3. language locale,
  4. default USD.
- Exchange rate fetching from ExchangeRate-API in `src/services/currencyConverter.ts`.
- Fallback rates and cache support for offline or API failure scenarios.
- Manual currency picker using `src/components/CurrencySwitcher.tsx`.
- Price formatting using `Intl.NumberFormat` and locale-aware formatting.

### UI and interaction
- Tailwind CSS + Radix UI utility components in `src/components/ui/`.
- Hover and interaction states with polished card actions.
- Global toast messaging using Sonner.
- Responsive header, mobile menu, and footer.
- Skeleton loaders for product grid loading state.

## Architecture and implementation details

### App initialization
- `src/main.tsx`
  - Registers i18n provider and localization context.
  - Initializes RTL support on page load.

- `src/App.tsx`
  - Sets up React Router routes.
  - Wraps with `QueryClientProvider`, `TooltipProvider`, `CartProvider`, and toast providers.
  - Shows a loading screen while localization and geolocation initialize.

### Contexts and state management
- `src/context/LocalizationContext.tsx`
  - Loads geolocation, language, and currency state.
  - Exposes `formatPrice`, `formatCurrency`, `convertFromUSD`, and `resetPreferences`.
  - Detects RTL languages and updates `document.dir`.

- `src/context/CartContext.tsx`
  - Stores cart items with product variant keys, quantity, and computed subtotal.
  - Persists cart using `localStorage` under `castx-cart`.
  - Provides utility actions: `addToCart`, `removeFromCart`, `updateQuantity`, `toggleCart`, `clearCart`, and `isInCart`.

### Product and discount logic
- `src/lib/products.ts`
  - Defines product metadata, images, descriptions, sizes, and colors.
  - Provides helpers like `getProductBySlug`, `getFeaturedProducts`, and `getProductUrl`.

- `src/lib/discounts.ts`
  - Applies special country-based discount rules.
  - Example: Cameroon (`CM`) customers receive product-specific percentage discounts.
  - Discount logic is used in Products, ProductDetail, and Cart pages.

### Page by page
- `src/pages/Index.tsx`
  - Hero landing section with brand messaging.
  - Featured product showcase with add-to-cart from homepage.
  - Community CTA and testimonial section.

- `src/pages/About.tsx`
  - Brand story, mission, vision, and values sections.
  - Full-width image and community call-to-action.

- `src/pages/Products.tsx`
  - Product grid with filter by category and sort by price or newest.
  - Category counts with quick toggles and mobile drawer for filters.
  - Product card interactions to view details or add/remove from cart.

- `src/pages/ProductDetail.tsx`
  - Image carousel with autoplay.
  - Selected size and color state.
  - Real-time discount display and price formatting.
  - Add/remove cart button on the detail page.

- `src/pages/Community.tsx`
  - Community landing page with benefits and statistics.
  - WhatsApp invitation call to action.

- `src/pages/Cart.tsx`
  - Detailed cart items list with quantity controls.
  - Discount-aware total calculation.
  - Finalize purchase actions that open WhatsApp or email with a prefilled order.

- `src/pages/NotFound.tsx`
  - Simple 404 page with return-to-home action.

## File structure highlights

- `src/components/` — UI components and layout pieces.
- `src/components/ui/` — shared design-system components for buttons, cards, modals, selects, and more.
- `src/context/` — shared app state and behavior providers.
- `src/hooks/` — reusable hooks for currency, toast behavior, and mobile detection.
- `src/services/` — external-data helpers for geolocation and currency exchange.
- `src/lib/` — product definitions, discounts, RTL helpers, and i18n setup.
- `src/locales/` — translation JSON files for a broad set of supported languages.

## Installation

Install dependencies:

```bash
npm install
```

If you use Bun:

```bash
bun install
```

## Development commands

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview build locally:

```bash
npm run preview
```

Run tests:

```bash
npm run test
```

Lint source files:

```bash
npm run lint
```

## Project status

- Status: **Active prototype / demo**
- Implemented: storefront pages, localization, currency conversion, product catalog, cart persistence, and order submission flow.
- Not implemented: payment gateway integration, order management backend, user accounts, inventory stock tracking, and admin dashboard.
- Ideal next steps: connect a backend API, add real product inventory, implement checkout and payment processing, and expand community features.

## Project notes

- Geolocation is cached in localStorage to reduce repeated API calls.
- Exchange rates are cached for 7 days. If the API fails, the app uses hardcoded fallback rates.
- The app supports language persistence and currency override through browser storage.
- Cart operations are optimized for variant uniqueness using color + size + product slug.
- The checkout flow is intentionally lightweight and uses external messaging rather than a payment gateway.

## Customization guide

- Add products / change inventory in `src/lib/products.ts`.
- Add or update translations under `src/locales/{lang}/translation.json`.
- Configure currency behavior in `src/hooks/useCurrency.ts` and map country codes to currency settings.
- Extend discount logic in `src/lib/discounts.ts`.
- Update UI text, layout, and styling through the Tailwind-based `src/components/ui/` system.

## Dependencies

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Radix UI
- `react-router-dom`
- `react-i18next`
- `@tanstack/react-query`
- `sonner`
- `lucide-react`
- `embla-carousel-react`
- `react-day-picker`
- `@hookform/resolvers`

## License

No license is specified. Add a `LICENSE` file if you want to publish or share this project publicly.
