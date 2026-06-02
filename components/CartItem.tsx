import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
import { CartItem as CartItemType } from '../types/cart';
import { formatCurrency } from '../utils/currency';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { product, quantity } = item;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <TouchableOpacity
            onPress={() => onRemove(product.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="trash-2" size={16} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onDecrease(product.id)}
            activeOpacity={0.7}
          >
            <Feather name="minus" size={14} color={theme.colors.text} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onIncrease(product.id)}
            activeOpacity={0.7}
          >
            <Feather name="plus" size={14} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    gap: theme.spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
    lineHeight: 18,
  },
  price: {
    fontSize: theme.fontSize.md,
    color: theme.colors.accent,
    fontWeight: theme.fontWeight.bold,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semiBold,
    minWidth: 24,
    textAlign: 'center',
  },
});

export default CartItem;