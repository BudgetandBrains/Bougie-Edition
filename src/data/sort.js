/* ============================================================
   BOUGIE EDITION — sorting for product listings
   Order is driven by the ?sort= URL param so a sorted view can be
   linked and shared (the home page already links /shop?sort=new).
   ============================================================ */

// `value` is what appears in the URL — keep these stable, they're linkable.
export const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'new',        label: 'New in first' },
  { value: 'price-asc',  label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'brand',      label: 'Brand: A–Z' }
];

export const DEFAULT_SORT = 'featured';

export function isSortValue(v){
  return SORT_OPTIONS.some((o) => o.value === v);
}

// Falls back to the default for anything unrecognised, so a stale or
// hand-edited ?sort= never leaves the grid empty or unsorted oddly.
export function normalizeSort(v){
  return isSortValue(v) ? v : DEFAULT_SORT;
}

function hasTag(p, tag){
  return (p.tags || []).some((t) => (t || '').toLowerCase() === tag.toLowerCase());
}

const COMPARATORS = {
  // Catalog order — the sequence the sheet is arranged in. This is the
  // default, so the grid looks exactly as it did before sorting existed
  // and the running order stays the merchandiser's to set.
  featured: () => 0,
  // The sheet carries no date column, so "new" leans on the New in tag
  // rather than inventing a chronology we don't have.
  new: (a, b) => (hasTag(b.product, 'New in') ? 1 : 0) - (hasTag(a.product, 'New in') ? 1 : 0),
  'price-asc': (a, b) => (a.product.price || 0) - (b.product.price || 0),
  'price-desc': (a, b) => (b.product.price || 0) - (a.product.price || 0),
  brand: (a, b) => (a.product.brand || '').localeCompare(b.product.brand || '')
};

/**
 * Sort a list of products by one of SORT_OPTIONS.
 *
 * Takes and returns [{ product, index }] — `index` is the position in the
 * FULL catalog, which is what /product/:id resolves against, so reordering
 * here never disturbs where a card links.
 *
 * Ties fall back to catalog order, keeping the result stable: the same
 * input always yields the same order.
 */
export function sortProducts(entries, sortValue){
  const cmp = COMPARATORS[normalizeSort(sortValue)];
  return entries
    .slice()
    .sort((a, b) => cmp(a, b) || (a.index - b.index));
}
