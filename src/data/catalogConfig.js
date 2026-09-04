// The catalog Google Sheet, fetched at runtime as CSV — see README.md.
// Must be a URL that returns raw CSV (NOT the /edit share link):
//   • Export endpoint (used here): /export?format=csv   — works for any
//     sheet shared "Anyone with the link → Viewer".
//   • Or File → Share → Publish to web → CSV: /d/e/XXXX/pub?output=csv
// Add &gid=<tabId> to point at a specific tab (default is the first tab).
export const CATALOG_CSV_URL = 'https://docs.google.com/spreadsheets/d/1gz1lY1lOJrVmMDCoRsaxDFIprQnxvvX4uBeRlkjGN7c/export?format=csv';

// ── Product images by folder ────────────────────────────────────────────────
// Put a static base URL here that serves images BY PATH (a web host / bucket /
// CDN). Each product's "Folder" cell in the sheet is appended to this, and the
// site loads images by number until one is missing:
//   <IMAGE_ROOT>/<folder>/1.jpg, /2.jpg, /3.jpg …   (any count per product)
//
// NOTE: a raw Google Drive share link will NOT work here — Drive serves files
// by file-id, not by folder path. Point IMAGE_ROOT at path-based hosting.
// Leave IMAGE_ROOT = '' to keep using the per-image URL columns instead.
export const IMAGE_ROOT = '';
export const IMAGE_EXT = '.jpg';
export const IMAGE_MAX = 15; // safety cap on how many images to probe per product
