import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
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
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadow.sm,
  },
  imageContainer: {
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    padding: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  category: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semiBold,
    lineHeight: 22,
  },
  price: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
    marginTop: theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  detailButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semiBold,
  },
  cartButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
  },
  cartButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.semiBold,
  },
});

export default ProductCard;