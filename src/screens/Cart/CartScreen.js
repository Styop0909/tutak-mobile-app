import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import { useBonusStore } from '../../store/bonusStore';
import { CartItem } from '../../components/cart/CartItem';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const CartScreen = ({ navigation }) => {
  const {
    items,
    totalItems,
    totalPrice,
    bonusUsed,
    updateQuantity,
    removeItem,
    clearCart,
    applyBonus,
    getTotalWithBonus,
  } = useCartStore();
  const { balance } = useBonusStore();
  const [useBonus, setUseBonus] = useState(false);

  const handleCheckout = () => {
    // Navigate to checkout screen
    navigation.navigate('Checkout');
  };

  const handleApplyBonus = () => {
    const bonusAmount = Math.min(balance, totalPrice);
    applyBonus(useBonus ? 0 : bonusAmount);
    setUseBonus(!useBonus);
  };

  const totalWithBonus = getTotalWithBonus();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="shopping-bag" size={60} color={colors.grey[400]} />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Browse our menu and add items you like</Text>
        <Button
          title="Browse Menu"
          onPress={() => navigation.navigate('Menu')}
          style={styles.browseButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
            onRemove={() => removeItem(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
      />

      <Card style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
          <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
        </View>

        {balance > 0 && (
          <TouchableOpacity style={styles.bonusRow} onPress={handleApplyBonus}>
            <View style={styles.bonusInfo}>
              <Feather name="gift" size={18} color={colors.primary.main} />
              <Text style={styles.bonusText}>
                Use {Math.min(balance, totalPrice)} bonus points
              </Text>
            </View>
            <View style={[styles.bonusToggle, useBonus && styles.bonusToggleActive]} />
          </TouchableOpacity>
        )}

        {bonusUsed > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bonus discount</Text>
            <Text style={[styles.summaryValue, styles.discount]}>
              -${bonusUsed.toFixed(2)}
            </Text>
          </View>
        )}

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalWithBonus.toFixed(2)}</Text>
        </View>

        <Button
          title="Checkout"
          onPress={handleCheckout}
          style={styles.checkoutButton}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  emptyText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  browseButton: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  cartList: {
    paddingVertical: spacing.sm,
  },
  summary: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '500',
  },
  bonusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.grey[200],
  },
  bonusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bonusText: {
    ...typography.body2,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  bonusToggle: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.grey[300],
  },
  bonusToggleActive: {
    backgroundColor: colors.primary.main,
  },
  discount: {
    color: colors.success,
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.grey[200],
  },
  totalLabel: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  totalValue: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: spacing.md,
  },
});
