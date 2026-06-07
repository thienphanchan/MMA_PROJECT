import axios from 'axios';
import { Product } from '../types/product';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch products');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? `Failed to fetch product with id ${id}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

// --- 2 hàm mới ---

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<string[]>('/products/categories');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch categories');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch products by category');
    }
    throw new Error('An unexpected error occurred');
  }
};