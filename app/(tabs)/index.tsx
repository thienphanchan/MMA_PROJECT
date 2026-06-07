import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useLayout } from '@/hooks/useLayout';
import useProducts from '@/hooks/useProducts';
import useSearch from '@/hooks/useSearch';
import useCartStore from '@/store/cartStore';
import type { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const { numColumns, isLandscape } = useLayout();
  const {
    products, loading, error, categories,
    fetchProducts, fetchCategories, fetchByCategory,
  } = useProducts();
  const { query, setQuery, filteredResults } = useSearch(products);
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    void fetchProducts();
    void fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleSelectCategory = async (category: string): Promise<void> => {
    setSelectedCategory(category);
    setQuery('');
    if (category === 'all') {
      await fetchProducts();
    } else {
      await fetchByCategory(category);
    }
  };

  const displayedProducts: Product[] = query.trim() ? filteredResults : products;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Something went wrong.</Text>
        <Text style={styles.errorDetail}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        style={styles.categoryScroll}
      >
        {['all', ...categories].map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              onPress={() => handleSelectCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* key={numColumns} để FlatList re-render đúng khi đổi số cột */}
      <FlatList
        key={numColumns}
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={[
          styles.list,
          isLandscape && styles.listLandscape,
        ]}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onAddToCart={() => addToCart(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: { marginTop: spacing.sm, fontSize: fontSize.md, color: colors.textSecondary },
  errorText: { fontSize: fontSize.lg, fontWeight: '600', color: colors.danger, marginBottom: spacing.xs },
  errorDetail: { fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center' },
  emptyText: { fontSize: fontSize.md, color: colors.textMuted },
  row: { justifyContent: 'space-between', paddingHorizontal: spacing.sm },
  list: { paddingVertical: spacing.sm },
  listLandscape: { paddingHorizontal: spacing.md },
  // Thay phần styles category cũ bằng cái này
  categoryList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,      // thêm padding trên dưới để chữ không bị cắt
    gap: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',             // căn giữa theo chiều dọc
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,      // tăng padding dọc từ xs+2 lên sm
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexShrink: 0,                    // không cho chip bị co lại
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '600',
    includeFontPadding: false,        // Android: bỏ padding thừa của font
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  categoryScroll: {
    flexGrow: 0,          // không cho ScrollView chiếm hết chiều cao
    flexShrink: 0,
    minHeight: 44,        // đảm bảo đủ cao để hiện chữ
  },
});