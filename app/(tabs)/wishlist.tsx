import ProductCard from '@/components/ProductCard';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useLayout } from '@/hooks/useLayout';
import useWishlistStore from '@/store/wishlistStore';
import type { Product } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function WishlistScreen(): React.JSX.Element {
  const router = useRouter();
  const { numColumns, isLandscape } = useLayout();
  const items = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={72} color={colors.border} />
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the ❤️ icon on any product to save it here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={items}
        keyExtractor={(item: Product) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={[
          styles.list,
          isLandscape && styles.listLandscape,
        ]}
        extraData={wishlistItems}
        renderItem={({ item }: { item: Product }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  row: { justifyContent: 'space-between', paddingHorizontal: spacing.sm },
  list: { paddingVertical: spacing.sm },
  listLandscape: { paddingHorizontal: spacing.md },
});
