import HeaderBackButton from '@/components/HeaderBackButton';
import HeaderCartButton from '@/components/HeaderCartButton';
import { colors, fontSize } from '@/constants/theme';
import useCartStore from '@/store/cartStore';
import useWishlistStore from '@/store/wishlistStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function CartBadge(): React.JSX.Element | null {
  const items = useCartStore((state) => state.items);
  const count: number = items.reduce((sum: number, item) => sum + item.quantity, 0);

  if (count === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

function WishlistBadge(): React.JSX.Element | null {
  const items = useWishlistStore((state) => state.items);
  if (items.length === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{items.length > 99 ? '99+' : items.length}</Text>
    </View>
  );
}

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerLeft: () => <HeaderBackButton />,
        headerRight: () => <HeaderCartButton />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View>
              <Ionicons name="cart-outline" size={size} color={color} />
              <CartBadge />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View>
              <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
              <WishlistBadge />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabBarLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.surface,
    fontSize: fontSize.xs,
    fontWeight: '700',
    lineHeight: 16,
  },
});