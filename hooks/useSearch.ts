import { useMemo, useState } from 'react';
import { Product } from '../types/product';

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  filteredResults: Product[];
}

const useSearch = (products: Product[]): UseSearchReturn => {
  const [query, setQuery] = useState<string>('');

  const filteredResults = useMemo<Product[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  return { query, setQuery, filteredResults };
};

export default useSearch;