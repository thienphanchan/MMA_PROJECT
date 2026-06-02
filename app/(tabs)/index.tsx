import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { colors, fontSize, spacing } from '@/constants/theme';
import useProducts from '@/hooks/useProducts';
import useSearch from '@/hooks/useSearch';
import useCartStore from '@/store/cartStore';
import type { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const { products, loading, error, fetchProducts } = useProducts();
  const { query, setQuery, filteredResults } = useSearch(products);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const displayedProducts: Product[] = query.trim() ? filteredResults : products;

  const handleViewDetail = (id: number): void => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (product: Product): void => {
    addToCart(product);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Something went wrong.</Text>
        <Text style={styles.errorDetail}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleViewDetail(item.id)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.danger,
    marginBottom: spacing.xs,
  },
  errorDetail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  list: {
    paddingVertical: spacing.sm,
  },
});