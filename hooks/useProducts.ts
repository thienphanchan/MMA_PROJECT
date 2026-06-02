import { useCallback, useState } from 'react';
import { getProductById, getProducts } from '../services/productApi';
import { Product } from '../types/product';

interface UseProductsReturn {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
}

const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch product with id ${id}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProductById,
  };
};

export default useProducts;