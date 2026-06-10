import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { Product } from '../types/product';

const STORAGE_KEY = 'wishlist-storage';

const loadStoredItems = async (): Promise<Product[]> => {
  try {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (!storedValue) return [];
    const parsed: { items?: Product[] } = JSON.parse(storedValue);
    return parsed.items ?? [];
  } catch {
    return [];
  }
};

const saveStoredItems = async (items: Product[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
  } catch {
    // ignore
  }
};

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
}

const useWishlistStore = create<WishlistState>()((set, get) => ({
  items: [],

  toggleWishlist: (product: Product) => {
    const exists = get().items.some((p) => p.id === product.id);
    const nextItems = exists
      ? get().items.filter((p) => p.id !== product.id)
      : [...get().items, product];
    set({ items: nextItems });
    void saveStoredItems(nextItems);
  },

  isWishlisted: (productId: number) => {
    return get().items.some((p) => p.id === productId);
  },

  clearWishlist: () => {
    set({ items: [] });
    void saveStoredItems([]);
  },
}));

void loadStoredItems().then((items) => {
  useWishlistStore.setState({ items });
});

export default useWishlistStore;
