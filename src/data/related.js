/* ============================================================
   BOUGIE EDITION — "More like this"
   Picks suggested pieces for a product page using ONLY the live
   inventory already loaded from the catalog (Google Sheet or the
   bundled fallback). No separate list to maintain: add a piece to
   the sheet and it becomes eligible automatically.
   ============================================================ */

// How much each signal contributes to a candidate's score.
// Brand and category dominate; price keeps suggestions in the same
// tier so a $530 belt never reads as an alternative to a $23k Birkin.
export const WEIGHTS = {
  brand: 5,
  category: 4,
  price: 3,   // scaled 0 → 3 by how close the two prices are
  tag: 1,     // per shared tag, capped by TAG_CAP
  soldOut: 3  // penalty — sold pieces sink, but stay eligible
};

const TAG_CAP = 2;

function tagsOf(p){
  if(p && p.tags && p.tags.length) return p.tags;
  return p && p.tag ? [p.tag] : [];
}

// 0 → 1, where 1 is an identical price. Ratio-based so it works the
// same at every tier: $2k vs $3k scores like $20k vs $30k.
function priceAffinity(a, b){
  if(!(a > 0) || !(b > 0)) return 0;
  return Math.min(a, b) / Math.max(a, b);
}

/**
 * Score one candidate against the product being viewed.
 * Higher is more alike. Exported for testing/tuning.
 */
export function scoreRelated(target, candidate){
  if(!target || !candidate) return 0;
  let score = 0;

  const tBrand = (target.brand || '').toLowerCase();
  const cBrand = (candidate.brand || '').toLowerCase();
  if(tBrand && tBrand === cBrand) score += WEIGHTS.brand;

  const tCat = (target.category || '').toLowerCase();
  const cCat = (candidate.category || '').toLowerCase();
  if(tCat && tCat === cCat) score += WEIGHTS.category;

  score += priceAffinity(target.price, candidate.price) * WEIGHTS.price;

  const tTags = tagsOf(target);
  const shared = tagsOf(candidate).filter((t) => tTags.includes(t)).length;
  score += Math.min(shared, TAG_CAP) * WEIGHTS.tag;

  if(candidate.soldOut) score -= WEIGHTS.soldOut;

  return score;
}

/**
 * Suggestions for the product at `index` in `products`.
 *
 * Returns [{ product, index }] — `index` is the position in the ORIGINAL
 * products array, which is what /product/:id resolves against. Never use
 * the position within this result to build a link.
 *
 * @param {Array}  products - the full catalog from useCatalog()
 * @param {number} index    - catalog index of the product on screen
 * @param {number} count    - how many to return (default 4 = one grid row)
 */
export function getRelatedProducts(products, index, count = 4){
  if(!Array.isArray(products) || products.length < 2) return [];
  const target = products[index];
  if(!target) return [];

  return products
    .map((product, i) => ({ product, index: i }))
    // Drop the piece being viewed. Compare by identity where we can and
    // fall back to index, so a duplicated row can't shadow the original.
    .filter((c) => c.index !== index && c.product !== target)
    .map((c) => ({ ...c, score: scoreRelated(target, c.product) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, count)
    .map(({ product, index: i }) => ({ product, index: i }));
}
