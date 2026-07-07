import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const BonusCard = ({ balance, frozen, expiringSoon }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bonus Points</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>{balance || 0}</Text>
          <Text style={styles.balanceLabel}>available</Text>
        </View>
      </View>

      <View style={styles.stats}>
        {frozen > 0 && (
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Frozen</Text>
            <Text style={[styles.statValue, styles.frozen]}>{frozen}</Text>
          </View>
        )}
        {expiringSoon > 0 && (
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Expiring soon</Text>
            <Text style={[styles.statValue, styles.expiring]}>{expiringSoon}</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.primary.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.body2,
    color: colors.white,
    opacity: 0.9,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    ...typography.h1,
    color: colors.white,
    fontSize: 36,
  },
  balanceLabel: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
  },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.white,
    opacity: 0.8,
  },
  statItem: {
    marginRight: spacing.lg,
  },
  statLabel: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
  },
  statValue: {
    ...typography.h5,
    color: colors.white,
  },
  frozen: {
    color: colors.warning,
  },
  expiring: {
    color: colors.error,
  },
});
