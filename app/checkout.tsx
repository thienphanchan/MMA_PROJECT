import { useLayout } from '@/hooks/useLayout';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import useCartStore from '@/store/cartStore';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/currency';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FormData {
  name: string;
  email: string;
  address: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Họ tên phải có ít nhất 2 ký tự';
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }
  if (!data.address.trim() || data.address.trim().length < 10) {
    errors.address = 'Địa chỉ phải có ít nhất 10 ký tự';
  }
  return errors;
}

export default function CheckoutScreen(): React.JSX.Element {
  const router = useRouter();
  const { isLandscape } = useLayout();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState<FormData>({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  const handleChange = (field: keyof FormData, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePlaceOrder = (): void => {
    if (items.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm trước khi đặt hàng.');
      return;
    }
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const summaryLines = items.map(
      (item) => `- ${item.product.title} x${item.quantity} (${formatCurrency(item.product.price * item.quantity)})`
    );
    Alert.alert(
      '✅ Đặt hàng thành công',
      [
        `Mã đơn: ${orderId}`,
        `Khách hàng: ${form.name}`,
        `Email: ${form.email}`,
        `Địa chỉ: ${form.address}`,
        '',
        'Sản phẩm:',
        ...summaryLines,
        '',
        `Tổng tiền: ${formatCurrency(total)}`,
      ].join('\n'),
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)' as any);
          },
        },
      ]
    );
  };

  // Component con để tái sử dụng
  const OrderSummaryBlock = () => (
    <>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.card}>
        {items.length === 0 ? (
          <Text style={styles.emptyCartText}>Giỏ hàng trống.</Text>
        ) : (
          items.map((item: CartItem) => (
            <View key={item.product.id} style={styles.orderRow}>
              <Text style={styles.orderItemName} numberOfLines={1}>
                {item.product.title}
              </Text>
              <Text style={styles.orderItemQty}>x{item.quantity}</Text>
              <Text style={styles.orderItemPrice}>
                {formatCurrency(item.product.price * item.quantity)}
              </Text>
            </View>
          ))
        )}
        <View style={styles.divider} />
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
      </View>
    </>
  );

  const ShippingBlock = () => (
    <>
      <Text style={styles.sectionTitle}>Shipping Details</Text>
      <View style={styles.card}>
        <Text style={styles.fieldLabel}>Full Name</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Enter your full name"
          placeholderTextColor={colors.textMuted}
          value={form.name}
          onChangeText={(v) => handleChange('name', v)}
          autoCapitalize="words"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.fieldLabel}>Email Address</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Enter your email"
          placeholderTextColor={colors.textMuted}
          value={form.email}
          onChangeText={(v) => handleChange('email', v)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.fieldLabel}>Delivery Address</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline, errors.address ? styles.inputError : null]}
          placeholder="Enter your delivery address"
          placeholderTextColor={colors.textMuted}
          value={form.address}
          onChangeText={(v) => handleChange('address', v)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, items.length === 0 && styles.submitButtonDisabled]}
        onPress={handlePlaceOrder}
        disabled={items.length === 0}
      >
        <Text style={styles.submitButtonText}>Place Order</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {isLandscape ? (
        // Landscape: 2 cột ngang
        <View style={styles.landscapeInner}>
          <View style={styles.column}>
            <OrderSummaryBlock />
          </View>
          <View style={styles.column}>
            <ShippingBlock />
          </View>
        </View>
      ) : (
        // Portrait: stack dọc
        <>
          <OrderSummaryBlock />
          <ShippingBlock />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  // Layout
  landscapeInner: {
    flexDirection: 'row',
    gap: spacing.lg,
    alignItems: 'flex-start',
  },
  column: { flex: 1 },
  // Section
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  // Order summary
  orderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  orderItemName: { flex: 1, fontSize: fontSize.sm, color: colors.text, marginRight: spacing.sm },
  orderItemQty: { fontSize: fontSize.sm, color: colors.textSecondary, marginRight: spacing.sm, minWidth: 28, textAlign: 'center' },
  orderItemPrice: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, minWidth: 60, textAlign: 'right' },
  emptyCartText: { fontSize: fontSize.sm, color: colors.textMuted },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  summaryLabel: { fontSize: fontSize.md, color: colors.textSecondary },
  summaryValue: { fontSize: fontSize.md, color: colors.text },
  totalLabel: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: fontSize.md, fontWeight: '800', color: colors.success },
  // Form
  fieldLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  inputMultiline: { height: 80, paddingTop: spacing.sm },
  inputError: { borderColor: colors.danger },
  errorText: { fontSize: fontSize.sm, color: colors.danger, marginTop: spacing.xs },
  // Button
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { color: colors.surface, fontSize: fontSize.md, fontWeight: '700' },
});