import { colors, fontSize, radius, spacing } from '@/constants/theme';
import useCartStore from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HeaderCartButton = (): React.JSX.Element => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go to cart"
      hitSlop={12}
      onPress={() => router.push('/(tabs)/cart')}
      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
    >
      <Ionicons name="cart-outline" size={20} color={colors.text} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default HeaderCartButton;
