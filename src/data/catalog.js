/* ============================================================
   BOUGIE EDITION — self-serve catalog
   Reads a published Google Sheet as CSV (see catalogConfig.js) so
   the client can add/edit/hide stock themselves — no code changes.
   Falls back to sample data until a CSV URL is configured, or if
   the sheet can't be reached.
   ============================================================ */
import { CATALOG_CSV_URL } from './catalogConfig';

const FALLBACK = [
  {status:'Live',tag:'Featured',category:'bags',brand:'Dior',name:'Cannage lambskin flap, rose',price:4050,condition:'Excellent',description:'Cannage-quilted lambskin, aged gold hardware.',images:['/assets/products/IMG_6733.jpg']},
  {status:'Live',tag:'Best seller',category:'bags',brand:'Saint Laurent',name:'Metallic calf flap, silver',price:2350,condition:'Very good',description:'Metallic calfskin, chain-and-leather strap.',images:['/assets/products/IMG_6673.jpg']},
  {status:'Live',tag:'Featured',category:'bags',brand:'Bottega Veneta',name:'Leather micro shopper, ivory',price:1900,condition:'Excellent',description:'Intrecciato leather, drawstring top.',images:['/assets/products/IMG_6704.jpg']},
  {status:'Live',tag:'New in',category:'bags',brand:'Chanel',name:'Croc-effect flap, cobalt',price:5200,condition:'Excellent',description:'Croc-embossed calfskin, gold-tone hardware.',images:['/assets/products/IMG_6668.jpg']},
  {status:'Live',tag:'New in',category:'bags',brand:'Chanel',name:'Quilted round bag, cobalt',price:3050,condition:'Excellent',description:'Lambskin, round silhouette, chain strap.',images:['/assets/products/IMG_6759.jpg']},
  {status:'Live',tag:'New in',category:'bags',brand:'Gucci',name:'GG floral zip pouch',price:1130,condition:'Very good',description:'GG canvas with floral print, top handle.',images:['/assets/products/IMG_6773.jpg']},
  {status:'Live',tag:'New in',category:'bags',brand:'Bottega Veneta',name:'Micro tote, ivory',price:1700,condition:'Excellent',description:'Woven leather micro tote.',images:['/assets/products/IMG_6712.jpg']},
  {status:'Live',tag:'Featured',category:'bags',brand:'Louis Vuitton',name:'Monogram mini pouch, blue',price:1590,condition:'Very good',description:'Monogram canvas, leather trim.',images:['/assets/products/IMG_6652.jpg']},
  {status:'Live',tag:'Sale',category:'bags',brand:'Chanel',name:'Quilted flap wallet, noir',price:1250,condition:'Good',description:'Lambskin flap wallet, CC turnlock.',images:['/assets/products/IMG_6646.jpg']},
  {status:'Live',tag:'Sale',category:'bags',brand:'Chanel',name:'Patent wallet-on-chain, noir',price:2100,condition:'Very good',description:'Patent leather WOC, chain strap.',images:['/assets/products/IMG_6644.jpg']},
  {status:'Live',tag:'Featured',category:'bags',brand:'Hermès',name:'Birkin 30 Togo',price:23350,condition:'Excellent',description:'Togo leather, palladium hardware.',images:['/assets/products/IMG_6656.jpg']},
  {status:'Live',tag:'Best seller',category:'bags',brand:'Chanel',name:'Classic Flap, medium',price:11700,condition:'Excellent',description:'Caviar leather, gold-tone hardware.',images:['/assets/products/IMG_6690.jpg']},
  {status:'Live',tag:'Featured',category:'bags',brand:'Louis Vuitton',name:'Capucines BB',price:7175,condition:'Excellent',description:'Taurillon leather, sculptural handle.',images:['/assets/products/IMG_6701.jpg']},
  {status:'Live',tag:'',category:'bags',brand:'Dior',name:'Lady Dior, medium',price:6725,condition:'Very good',description:'Cannage lambskin, Dior charms.',images:['/assets/products/IMG_6679.jpg']},
  {status:'Live',tag:'New in',category:'bags',brand:'Bottega Veneta',name:'Andiamo Intreccio',price:5200,condition:'Excellent',description:'Intrecciato leather, structured top handle.',images:['/assets/products/IMG_6727.jpg']},
  {status:'Live',tag:'',category:'bags',brand:'Celine',name:'Triomphe Besace',price:3750,condition:'Very good',description:'Smooth calfskin, Triomphe hardware.',images:['/assets/products/IMG_6729.jpg']},
  {status:'Live',tag:'',category:'bags',brand:'Prada',name:'Galleria Saffiano',price:3300,condition:'Good',description:'Saffiano leather, structured tote.',images:['/assets/products/IMG_6785.jpg']},
  {status:'Live',tag:'Best seller',category:'bags',brand:'Fendi',name:'Peekaboo ISeeU',price:6100,condition:'Excellent',description:'Nappa leather, signature twist lock.',images:['/assets/products/IMG_6948.jpg']},

  {status:'Live',tag:'Best seller',category:'belts',brand:'Louis Vuitton',name:'Monogram belt',price:530,condition:'Very good',description:'Monogram canvas, reversible.',images:['/assets/products/IMG_6963.jpg']},
  {status:'Live',tag:'Featured',category:'belts',brand:'Dior',name:'Pendant necklace, silver',price:825,condition:'Excellent',description:'Sterling silver, CD signature pendant.',images:['/assets/products/IMG_7226.jpg']},
  {status:'Live',tag:'Featured',category:'belts',brand:'Cartier',name:'Fine station necklace',price:1400,condition:'Excellent',description:'Sterling silver station chain.',images:['/assets/products/IMG_7225.jpg']},
  {status:'Live',tag:'Featured',category:'belts',brand:'Cartier',name:'Love bracelet, yellow gold',price:8575,condition:'Excellent',description:'18k yellow gold, signature screw motif.',images:['/assets/products/IMG_6958.jpg']},
  {status:'Live',tag:'Best seller',category:'belts',brand:'Gucci',name:'GG Marmont, reversible',price:545,condition:'Very good',description:'GG canvas, reversible leather belt.',images:['/assets/products/IMG_7269.jpg']},
  {status:'Live',tag:'',category:'belts',brand:'Saint Laurent',name:'Monogram zip wallet',price:660,condition:'Good',description:'Grain de poudre leather zip wallet.',images:['/assets/products/IMG_7285.jpg']},
  {status:'Live',tag:'Featured',category:'belts',brand:'Hermès',name:'Constance reversible belt',price:940,condition:'Excellent',description:'Box calf / Togo reversible strap.',images:['/assets/products/IMG_6663.jpg']},
  {status:'Live',tag:'',category:'belts',brand:'Prada',name:'Symbole acetate sunglasses',price:430,condition:'Very good',description:'Acetate frame, Symbole hardware.',images:['/assets/products/IMG_6751.jpg']},
  {status:'Live',tag:'',category:'belts',brand:'Van Cleef & Arpels',name:'Alhambra pendant',price:4050,condition:'Excellent',description:'18k gold, mother-of-pearl motif.',images:['/assets/products/IMG_6745.jpg']},
  {status:'Live',tag:'Best seller',category:'belts',brand:'Louis Vuitton',name:'Initiales 40mm belt',price:775,condition:'Very good',description:'Monogram canvas, LV initials buckle.',images:['/assets/products/IMG_6650.jpg']},

  {status:'Live',tag:'Best seller',category:'watches',brand:'Rolex',name:'Datejust 41 Wimbledon',price:15175,condition:'Excellent',description:'Steel, Wimbledon dial, jubilee bracelet.',images:[]},
  {status:'Live',tag:'Featured',category:'watches',brand:'Audemars Piguet',name:'Royal Oak 41',price:53350,condition:'Excellent',description:'Steel, octagonal bezel, integrated bracelet.',images:[]},
  {status:'Live',tag:'',category:'watches',brand:'Omega',name:'Speedmaster Professional',price:8125,condition:'Very good',description:'Steel chronograph, hesalite crystal.',images:[]},
  {status:'Live',tag:'Featured',category:'watches',brand:'Cartier',name:'Santos de Cartier, large',price:9075,condition:'Excellent',description:'Steel, signature screw motif.',images:[]},
  {status:'Live',tag:'',category:'watches',brand:'Patek Philippe',name:'Nautilus 5711',price:162500,condition:'Excellent',description:'Steel, integrated bracelet, discontinued reference.',images:[]},
  {status:'Live',tag:'Best seller',category:'watches',brand:'Rolex',name:'Submariner Date',price:18000,condition:'Very good',description:'Steel, ceramic bezel, date function.',images:[]},
  {status:'Live',tag:'',category:'watches',brand:'Omega',name:'Seamaster 300M',price:6275,condition:'Very good',description:'Steel, wave-pattern dial, diver 300m.',images:[]},
  {status:'Live',tag:'New in',category:'watches',brand:'Cartier',name:'Tank Must, large',price:3950,condition:'Excellent',description:'Steel, Roman numerals, quartz movement.',images:[]}
];

function parseCSV(text){
  var rows = [], row = [], field = '', inQuotes = false;
  for(var i=0;i<text.length;i++){
    var c = text[i], n = text[i+1];
    if(inQuotes){
      if(c==='"' && n==='"'){ field+='"'; i++; }
      else if(c==='"'){ inQuotes=false; }
      else { field+=c; }
    } else {
      if(c==='"'){ inQuotes=true; }
      else if(c===','){ row.push(field); field=''; }
      else if(c==='\r'){ /* skip */ }
      else if(c==='\n'){ row.push(field); rows.push(row); row=[]; field=''; }
      else { field+=c; }
    }
  }
  if(field.length || row.length){ row.push(field); rows.push(row); }
  return rows.filter(function(r){ return r.length>1 || (r[0]||'').trim()!==''; });
}

function norm(s){ return (s||'').toString().trim().toLowerCase().replace(/[^a-z0-9]/g,''); }

function rowsToProducts(rows){
  if(!rows.length) return [];
  var head = rows[0].map(norm);
  function col(names){
    for(var i=0;i<names.length;i++){ var idx = head.indexOf(norm(names[i])); if(idx>-1) return idx; }
    return -1;
  }
  var idx = {
    status: col(['status']),
    tag: col(['tag']),
    category: col(['category']),
    brand: col(['brand']),
    name: col(['productname','name']),
    price: col(['priceusd','price']),
    condition: col(['condition']),
    description: col(['shortdescription','description']),
    img1: col(['image1','imagelink1','image']),
    img2: col(['image2','imagelink2']),
    img3: col(['image3','imagelink3'])
  };
  var out = [];
  for(var r=1;r<rows.length;r++){
    var row = rows[r];
    if(!row || !(row[idx.name]||'').trim()) continue;
    var images = [row[idx.img1],row[idx.img2],row[idx.img3]].filter(function(u){return u && u.trim();}).map(function(u){return u.trim();});
    out.push({
      status: (row[idx.status]||'Live').trim() || 'Live',
      tag: (row[idx.tag]||'').trim(),
      category: (row[idx.category]||'').trim().toLowerCase(),
      brand: (row[idx.brand]||'').trim(),
      name: (row[idx.name]||'').trim(),
      price: parseFloat((row[idx.price]||'0').replace(/[^0-9.]/g,'')) || 0,
      condition: (row[idx.condition]||'').trim(),
      description: (row[idx.description]||'').trim(),
      images: images
    });
  }
  return out;
}

function isLive(p){ return (p.status||'Live').trim().toLowerCase() !== 'hidden'; }

export async function loadCatalog(){
  if(!CATALOG_CSV_URL) return FALLBACK.filter(isLive);
  try{
    const r = await fetch(CATALOG_CSV_URL);
    if(!r.ok) throw new Error('Catalog sheet responded with ' + r.status);
    const text = await r.text();
    const products = rowsToProducts(parseCSV(text));
    return products.length ? products.filter(isLive) : FALLBACK.filter(isLive);
  }catch(err){
    console.warn('Bougie catalog: could not load the sheet, showing sample data —', err);
    return FALLBACK.filter(isLive);
  }
}
