import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  showRemove = true,
}) => {
  const { name, price, quantity, image, maxQuantity = 99 } = item;

  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Feather name="image" size={24} color={colors.grey[400]} />
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.quantity}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(Math.max(1, quantity - 1))}
            >
              <Feather name="minus" size={16} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
            >
              <Feather name="plus" size={16} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {showRemove && (
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
              <Feather name="trash-2" size={18} color={colors.error} />
            </TouchableOpacity>
          )}
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.grey[100],
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
  details: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '500',
  },
  price: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  actions: {
    alignItems: 'flex-end',
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.grey[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...typography.body2,
    marginHorizontal: spacing.md,
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
  },
});
