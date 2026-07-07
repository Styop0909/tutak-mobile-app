import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useOrderStore } from '../../store/orderStore';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const OrdersScreen = () => {
  const { orders, isLoading, fetchOrders } = useOrderStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return colors.warning;
      case 'processing': return colors.info;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.grey[500];
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'clock';
      case 'processing': return 'loader';
      case 'completed': return 'check-circle';
      case 'cancelled': return 'x-circle';
      default: return 'circle';
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="clipboard" size={60} color={colors.grey[400]} />
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptyText}>Start ordering and track your orders here</Text>
        <Button
          title="Browse Menu"
          onPress={() => navigation.navigate('Menu')}
          style={styles.browseButton}
        />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={orders}
      renderItem={({ item }) => (
        <Card style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{item.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Feather name={getStatusIcon(item.status)} size={12} color={colors.white} />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <Text style={styles.orderDate}>{item.date}</Text>
            <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
          </View>

          {item.items && (
            <View style={styles.itemsList}>
              {item.items.slice(0, 3).map((orderItem, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>
                    {orderItem.quantity}x {orderItem.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ${(orderItem.price * orderItem.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
              {item.items.length > 3 && (
                <Text style={styles.moreItems}>
                  +{item.items.length - 3} more items
                </Text>
              )}
            </View>
          )}
        </Card>
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
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
  orderCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  orderDate: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  orderTotal: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  itemsList: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.grey[200],
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  itemName: {
    ...typography.body2,
    color: colors.text.primary,
  },
  itemPrice: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  moreItems: {
    ...typography.caption,
    color: colors.text.hint,
    marginTop: spacing.xs,
  },
});
