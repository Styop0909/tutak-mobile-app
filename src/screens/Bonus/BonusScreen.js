import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useBonusStore } from '../../store/bonusStore';
import { BonusCard } from '../../components/bonus/BonusCard';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const BonusScreen = () => {
  const {
    balance,
    frozenBalance,
    history,
    isLoading,
    fetchBonusData,
  } = useBonusStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBonusData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBonusData();
    setRefreshing(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BonusCard
        balance={balance}
        frozen={frozenBalance}
        expiringSoon={0}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        {history?.length > 0 ? (
          history.map((transaction, index) => (
            <Card key={index} style={styles.transactionCard}>
              <View style={styles.transactionContent}>
                <View style={styles.transactionIcon}>
                  <Feather
                    name={transaction.type === 'earned' ? 'plus' : 'minus'}
                    size={16}
                    color={transaction.type === 'earned' ? colors.success : colors.error}
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.type === 'earned'
                      ? styles.earned
                      : styles.spent,
                  ]}
                >
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                </Text>
              </View>
            </Card>
          ))
        ) : (
          <Text style={styles.emptyText}>No transactions yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  transactionCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.grey[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    ...typography.body2,
    color: colors.text.primary,
  },
  transactionDate: {
    ...typography.caption,
    color: colors.text.hint,
    marginTop: spacing.xs,
  },
  transactionAmount: {
    ...typography.body1,
    fontWeight: 'bold',
  },
  earned: {
    color: colors.success,
  },
  spent: {
    color: colors.error,
  },
  emptyText: {
    ...typography.body2,
    color: colors.text.hint,
    textAlign: 'center',
    padding: spacing.lg,
  },
});
