import CartItem from '@/components/CartItem';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useLayout } from '@/hooks/useLayout';
import useCartStore from '@/store/cartStore';
import { CartItem as CartItemType } from '@/types/cart';
import { formatCurrency } from '@/utils/currency';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen(): React.JSX.Element {
  const router = useRouter();
  const { isLandscape } = useLayout();
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
        <Text style={styles.emptySubText}>Add some products to get started!</Text>
      </View>
    );
  }

  // Landscape: list bên trái, summary bên phải
  if (isLandscape) {
    return (
      <View style={styles.landscapeContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id.toString()}
          contentContainerStyle={styles.list}
          style={styles.landscapeList}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrease={() => increaseQuantity(item.product.id)}
              onDecrease={() => decreaseQuantity(item.product.id)}
              onRemove={() => removeFromCart(item.product.id)}
            />
          )}
        />
        <View style={styles.landscapeSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (8%)</Text>
            <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Portrait: layout cũ
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item: CartItemType) => item.product.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQuantity(item.product.id)}
            onDecrease={() => decreaseQuantity(item.product.id)}
            onRemove={() => removeFromCart(item.product.id)}
          />
        )}
      />
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (8%)</Text>
          <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  emptyIcon: { fontSize: 64, marginBottom: spacing.md },
  emptyText: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  emptySubText: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center' },
  list: { padding: spacing.sm },
  // Landscape
  landscapeContainer: { flex: 1, flexDirection: 'row', backgroundColor: colors.background },
  landscapeList: { flex: 1 },
  landscapeSummary: {
    width: 260,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  // Summary chung
  summaryContainer: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  summaryLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
  summaryValue: { fontSize: fontSize.sm, color: colors.text, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  totalLabel: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: fontSize.lg, fontWeight: '800', color: colors.success },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  checkoutButtonText: { color: colors.white, fontSize: fontSize.md, fontWeight: '700' },
});