import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const MenuItem = ({
  item,
  onAddToCart,
  showAddButton = true,
}) => {
  const { name, price, description, image, category, isAvailable = true } = item;

  return (
    <Card style={[styles.container, !isAvailable && styles.unavailable]}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Feather name="coffee" size={32} color={colors.grey[400]} />
            </View>
          )}
          {category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
          <View style={styles.bottomRow}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            {showAddButton && isAvailable && (
              <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
                <Feather name="plus" size={20} color={colors.white} />
              </TouchableOpacity>
            )}
            {!isAvailable && (
              <Text style={styles.unavailableText}>Unavailable</Text>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.sm,
  },
  unavailable: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.grey[100],
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: colors.primary.main,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    ...typography.caption,
    color: colors.white,
    fontSize: 8,
  },
  details: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
  },
  description: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  price: {
    ...typography.h6,
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableText: {
    ...typography.caption,
    color: colors.error,
  },
});
