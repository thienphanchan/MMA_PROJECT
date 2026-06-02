import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import useProducts from '@/hooks/useProducts';
import useSearch from '@/hooks/useSearch';
import useCartStore from '@/store/cartStore';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const { products, loading, error } = useProducts();
  const { query, setQuery, filteredResults } = useSearch(products);
  const addToCart = useCartStore((state: { addToCart: (product: Product) => void }) => state.addToCart);

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
        <ActivityIndicator size="large" color="#6200EE" />
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
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D32F2F',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  list: {
    paddingVertical: 12,
  },
});