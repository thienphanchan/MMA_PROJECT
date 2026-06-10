import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '../constants/theme';
import { Product } from '../types/product';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.85}
    >
      {/* Image + Heart Button */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={isWishlisted ? colors.accent : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.body}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>
    </TouchableOpacity>
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
  heartButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.full,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
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
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: fontWeight.semiBold,
    lineHeight: 20,
  },
  price: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.bold,
    marginTop: spacing.xs,
  },
});

export default ProductCard;