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

## Manage stock from a Google Sheet

The whole catalogue is driven by **one published Google Sheet** — no code changes, no
redeploy. Edit the sheet, refresh the site, and the change is live.

**One-time setup**

1. Open `public/assets/catalog-template.csv` in Google Sheets (File → Import → Upload).
2. File → Share → **Publish to web** → pick this tab → format **.csv** → **Publish**.
3. Copy the published link into `src/data/catalogConfig.js`:

   ```js
   export const CATALOG_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/XXXXX/pub?output=csv';
   ```

Until that URL is set, the site runs on the built-in sample catalogue in `src/data/catalog.js`,
so nothing ever breaks.

**Day-to-day — everything is a row edit**

| To do this…                     | …edit the sheet like this                                                        |
| ------------------------------- | -------------------------------------------------------------------------------- |
| **Add a product**               | Add a new row. Fill in Brand, Product Name, Price USD, Condition, Image links.    |
| **Mark something out of stock** | Set that row's **Status** to `Sold` (or `Out of stock`). It stays on the site with a greyed-out "Sold" badge and the buy button disabled. |
| **Bring it back**               | Set **Status** back to `Live` (or clear the cell).                               |
| **Take it off the site**        | Set **Status** to `Hidden`. It disappears completely but stays in your sheet.     |
| **Edit price / details**        | Just change the cell.                                                             |

Recognised **Status** values (case-insensitive):

- Shown & buyable — `Live`, `Available`, or blank
- Shown as sold — `Sold`, `Sold out`, `Out of stock`, `Reserved`, `On hold`
- Hidden entirely — `Hidden`, `Draft`, `Archived`

**Columns:** `Status, Tag, Category, Brand, Product Name, Price USD, Condition, Short Description`,
then images (see below). `Tag` (e.g. `Featured`, `Best seller`, `New in`, `Sale`) controls which
homepage rails a piece appears in. `Category` should be `bags`, `belts`, or `watches`.

**Certificate of Authenticity (optional).** Add a **`COA`** column and paste a link per product
(a PDF, an Entrupy/LegitApp report page, an image — any URL). When filled, the product page shows a
"View Certificate of Authenticity" button that opens that link in a new tab. Leave the cell blank
to hide the button for that piece. (Recognised header names: `COA`, `Certificate`,
`Certificate of Authenticity`, `Certificate URL`.)

> Note: a published Google Sheet can take a minute or two to reflect edits, as Google caches it.

## Product images — two ways

**A) One link per image (default).** Columns `Image 1, Image 2, Image 3` — paste a full public
image URL (or an `assets/products/xxx.jpg` file bundled with the app) in each. A product shows
whatever cells are filled.

**B) One folder per product (any number of images).** Set a static base URL in
`src/data/catalogConfig.js`:

```js
export const IMAGE_ROOT = 'https://your-host.com/product-images'; // serves images BY PATH
export const IMAGE_EXT  = '.jpg';
export const IMAGE_MAX  = 15; // safety cap on images probed per product
```

Then add a **`Folder`** column to the sheet with just a folder name per product (e.g.
`chanel-classic-flap`). Name the images inside each folder **`1.jpg`, `2.jpg`, `3.jpg` …** in order.
The site loads `‹IMAGE_ROOT›/‹folder›/1.jpg`, then `2.jpg`, and so on, **stopping at the first
number that's missing** — so each product can have a different number of images, with no per-image
links to maintain. Product cards and search use image `1`.

> ⚠️ **Google Drive won't work as `IMAGE_ROOT`.** Drive serves files by file-id
> (`drive.google.com/uc?id=…`), not by `folder/name.jpg` path, so numbered path URLs can't resolve.
> Use path-based hosting (a web server, an object-storage bucket / CDN, etc.). If you must use raw
> Drive links, use option **A** and paste each file's direct link per image column.

Leave `IMAGE_ROOT = ''` to stay on option A.

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
