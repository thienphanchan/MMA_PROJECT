import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

const STORAGE_KEY = 'cart-storage';

const loadStoredItems = async (): Promise<CartItem[]> => {
  try {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue: { state?: { items?: CartItem[] } } = JSON.parse(storedValue);
    return parsedValue.state?.items ?? [];
  } catch {
    return [];
  }
};

const saveStoredItems = async (items: CartItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        state: { items },
        version: 0,
      })
    );
  } catch {
    // Ignore persistence failures so cart interactions still work offline.
  }
};

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  (set, get) => ({
    items: [],

    addToCart: (product: Product) => {
      const existing = get().items.find((item) => item.product.id === product.id);
      const nextItems = existing
        ? get().items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...get().items, { product, quantity: 1 }];

      set({ items: nextItems });
      void saveStoredItems(nextItems);
    },

    removeFromCart: (productId: number) => {
      const nextItems = get().items.filter((item) => item.product.id !== productId);
      set({ items: nextItems });
      void saveStoredItems(nextItems);
    },

    increaseQuantity: (productId: number) => {
      const nextItems = get().items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      set({ items: nextItems });
      void saveStoredItems(nextItems);
    },

    decreaseQuantity: (productId: number) => {
      const nextItems = get().items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      set({ items: nextItems });
      void saveStoredItems(nextItems);
    },

    clearCart: () => {
      set({ items: [] });
      void saveStoredItems([]);
    },

    getTotalPrice: () => {
      return get().items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
  })
);

void loadStoredItems().then((items) => {
  useCartStore.setState({ items });
});

export default useCartStore;