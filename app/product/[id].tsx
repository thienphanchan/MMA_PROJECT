import { colors, fontSize, radius, spacing } from '@/constants/theme';
import useProducts from '@/hooks/useProducts';
import useCartStore from '@/store/cartStore';
import useWishlistStore from '@/store/wishlistStore';
import { formatCurrency } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const router = useRouter();
  const { product, loading, error, fetchProductById } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isWishlisted } = useWishlistStore();

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

  const handleBuyNow = (): void => {
    if (product) {
      addToCart(product);
      router.push('/checkout');
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

  const wishlisted = isWishlisted(product.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Image with heart button */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
        />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleWishlist(product)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={24}
            color={wishlisted ? colors.accent : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        {/* Category + Rating row */}
        <View style={styles.metaRow}>
          <Text style={styles.category}>{product.category.toUpperCase()}</Text>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingText}>
              {product.rating.rate} ({product.rating.count})
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* 2 action buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.85}
          >
            <Ionicons name="cart-outline" size={18} color={colors.primary} style={styles.btnIcon} />
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={handleBuyNow}
            activeOpacity={0.85}
          >
            <Text style={styles.buyNowText}>BUY NOW</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: spacing.xxl,
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
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.full,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  infoContainer: {
    padding: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: fontSize.xs,
    color: colors.accent,
    fontWeight: '700',
    letterSpacing: 1,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  ratingText: {
    fontSize: fontSize.xs,
    color: '#92400E',
    fontWeight: '600',
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
    marginBottom: spacing.md,
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
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.background,
    gap: 6,
  },
  btnIcon: {
    marginRight: 2,
  },
  addToCartText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buyNowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  buyNowText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});