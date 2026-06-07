import { useCallback, useState } from 'react';
import { getCategories, getProductById, getProducts, getProductsByCategory } from '../services/productApi';
import { Product } from '../types/product';

interface UseProductsReturn {
  products: Product[];
  product: Product | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchByCategory: (category: string) => Promise<void>;
}

const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
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
    setProduct(null);
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch product with id ${id}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      // silent fail — không ảnh hưởng UX chính
    }
  }, []);

  const fetchByCategory = useCallback(async (category: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    product,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchCategories,
    fetchByCategory,
  };
};

export default useProducts;