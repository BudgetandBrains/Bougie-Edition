# Bougie Edition — React app

A full React (Vite) port of the Bougie Edition storefront: routing, product catalog, currency
switcher, filters, forms and scroll animations all rebuilt as React components.

## Run it

```
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces a static `dist/` you can deploy anywhere;
`npm run preview` serves that build locally.

## Connect your product catalog

Products come from a published Google Sheet CSV, same workflow as before:

1. Open `public/assets/catalog-template.csv` in Google Sheets (File → Import).
2. File → Share → Publish to web → this sheet's tab → format **.csv** → Publish.
3. Copy that link into `src/data/catalogConfig.js`:

```js
export const CATALOG_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/XXXXX/pub?output=csv';
```

Add a row to add a product; set a row's `Status` to `Hidden` to take it off the site without
deleting it. Until the URL is set, the site runs on the built-in sample catalog in
`src/data/catalog.js` so nothing breaks.

## Structure

- `src/pages/` — one file per route (Home, Shop, Category, Drops, Product, Order, Brands,
  About, Consign, Sourcing, Consultation, Disclaimer).
- `src/components/` — shared chrome (Header, NavRail, Footer), ProductCard, PriceBlock,
  CurrencySwitcher, ConditionMeter, Reveal (scroll-in animation wrapper).
- `src/context/` — CatalogContext (loads + shares the product list) and CurrencyContext
  (currency switcher state, persisted to localStorage).
- `src/styles/` — the design system tokens + site stylesheet, unchanged in spirit from the
  original HTML build.
- `public/assets/` — logo, product photography, atelier videos, and the CSV template.
