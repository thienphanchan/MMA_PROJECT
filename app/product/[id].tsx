import useProducts from '@/hooks/useProducts';
import useCartStore from '@/store/cartStore';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
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

interface CartState {
  addToCart: (product: Product) => void;
}

export default function ProductDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const addToCart = useCartStore((state: CartState) => state.addToCart);

  const product: Product | undefined = products.find(
    (p: Product) => p.id === Number(id)
  );

  const handleAddToCart = (): void => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load product.</Text>
        <Text style={styles.errorDetail}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating: </Text>
          <Text style={styles.ratingValue}>
            {product.rating.rate} ⭐ ({product.rating.count} reviews)
          </Text>
        </View>

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 32,
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
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: '#6200EE',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
    lineHeight: 28,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E7D32',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  ratingValue: {
    fontSize: 14,
    color: '#555',
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});