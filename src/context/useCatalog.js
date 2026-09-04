import { createContext, useContext } from 'react';

export const CatalogContext = createContext({ products: [], loading: true });

export function useCatalog() {
  return useContext(CatalogContext);
}
