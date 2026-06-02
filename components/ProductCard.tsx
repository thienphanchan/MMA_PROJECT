import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../constants/theme';
import { Product } from '../types/product';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => onPress(product)}
        activeOpacity={0.85}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
      </TouchableOpacity>

      <View style={styles.body}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <TouchableOpacity onPress={() => onPress(product)} activeOpacity={0.8}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
        </TouchableOpacity>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => onPress(product)}
          activeOpacity={0.8}
        >
          <Text style={styles.detailButtonText}>View Detail</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => onAddToCart(product)}
          activeOpacity={0.8}
        >
          <Text style={styles.cartButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadow.sm,
  },
  imageContainer: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    padding: spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  category: {
    fontSize: fontSize.xs,
    color: colors.accent,
    fontWeight: fontWeight.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.semiBold,
    lineHeight: 22,
  },
  price: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: fontWeight.bold,
    marginTop: spacing.xs,
  },
  footer: {
    flexDirection: 'column',
    gap: spacing.xs,
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  detailButton: {
    width: '100%',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.semiBold,
  },
  cartButton: {
    width: '100%',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  cartButtonText: {
    fontSize: fontSize.sm,
    color: colors.white,
    fontWeight: fontWeight.semiBold,
  },
});

export default ProductCard;