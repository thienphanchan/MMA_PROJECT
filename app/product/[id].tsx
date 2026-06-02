import { colors, fontSize, radius, spacing } from '@/constants/theme';
import useProducts from '@/hooks/useProducts';
import useCartStore from '@/store/cartStore';
import { formatCurrency } from '@/utils/currency';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProductDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, error, fetchProductById } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const productId = Number(id);
    if (!Number.isNaN(productId)) {
      void fetchProductById(productId);
    }
  }, [fetchProductById, id]);

  const handleAddToCart = (): void => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
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
        contentFit="contain"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

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
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
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
  image: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
  },
  infoContainer: {
    padding: spacing.md,
  },
  category: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 28,
  },
  price: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.success,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  ratingValue: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  descriptionLabel: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
});