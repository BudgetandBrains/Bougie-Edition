import { useEffect, useState } from 'react';
import { loadCatalog } from '../data/catalog';
import { CatalogContext } from './useCatalog';

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalog().then((p) => { setProducts(p); setLoading(false); });
  }, []);

  return (
    <CatalogContext.Provider value={{ products, loading }}>
      {children}
    </CatalogContext.Provider>
  );
}
