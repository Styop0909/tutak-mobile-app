import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useBuildingStore } from '../../store/buildingStore';
import { useCartStore } from '../../store/cartStore';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const BuildingMaterialsScreen = () => {
  const { materials, categories, isLoading, fetchMaterials } = useBuildingStore();
  const { addItem } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMaterials();
    setRefreshing(false);
  };

  const filteredMaterials = selectedCategory === 'all'
    ? materials
    : materials.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    addItem({ ...item, type: 'building' });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        data={[{ id: 'all', name: 'All' }, ...categories]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item.id && styles.categoryItemActive,
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.id && styles.categoryTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoriesContent}
      />

      <FlatList
        data={filteredMaterials}
        renderItem={({ item }) => (
          <Card style={styles.materialCard}>
            <View style={styles.materialContent}>
              <View style={styles.materialInfo}>
                <Text style={styles.materialName}>{item.name}</Text>
                <Text style={styles.materialDescription}>{item.description}</Text>
                <View style={styles.materialDetails}>
                  <Text style={styles.materialPrice}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.materialUnit}>per {item.unit}</Text>
                </View>
              </View>
              <Button
                title="Add"
                onPress={() => handleAddToCart(item)}
                size="small"
                style={styles.addButton}
              />
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.materialsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="box" size={60} color={colors.grey[400]} />
            <Text style={styles.emptyText}>No materials available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  categoriesList: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.md,
  },
  categoryItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.grey[100],
  },
  categoryItemActive: {
    backgroundColor: colors.primary.main,
  },
  categoryText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  materialsList: {
    padding: spacing.md,
  },
  materialCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  materialContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  materialName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
  },
  materialDescription: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: 2,
  },
  materialDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  materialPrice: {
    ...typography.h6,
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  materialUnit: {
    ...typography.caption,
    color: colors.text.hint,
    marginLeft: spacing.xs,
  },
  addButton: {
    paddingHorizontal: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body1,
    color: colors.text.hint,
    marginTop: spacing.md,
  },
});
