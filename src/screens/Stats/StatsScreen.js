import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useStatsStore } from '../../store/statsStore';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const StatsScreen = () => {
  const { stats, isLoading, fetchStats } = useStatsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Statistics</Text>
      </View>

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Feather name="trending-up" size={24} color={colors.success} />
          <Text style={styles.statNumber}>{stats?.totalEarned || 0}</Text>
          <Text style={styles.statLabel}>Total Bonus Earned</Text>
        </Card>

        <Card style={styles.statCard}>
          <Feather name="trending-down" size={24} color={colors.error} />
          <Text style={styles.statNumber}>{stats?.totalSpent || 0}</Text>
          <Text style={styles.statLabel}>Total Bonus Spent</Text>
        </Card>
      </View>

      <Card style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Bonus Breakdown</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>From Orders</Text>
          <Text style={styles.detailValue}>{stats?.fromOrders || 0}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>From Referrals</Text>
          <Text style={styles.detailValue}>{stats?.fromReferrals || 0}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>From Promotions</Text>
          <Text style={styles.detailValue}>{stats?.fromPromotions || 0</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Used on Orders</Text>
          <Text style={styles.detailValue}>{stats?.usedOnOrders || 0}</Text>
        </View>
      </Card>

      {stats?.partners && (
        <View style={styles.partnersSection}>
          <Text style={styles.sectionTitle}>Partners</Text>
          {stats.partners.map((partner, index) => (
            <Card key={index} style={styles.partnerCard}>
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                <Text style={styles.partnerLocation}>{partner.location}</Text>
              </View>
              <Text style={styles.partnerBonus}>{partner.bonus || 0} pts</Text>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.xs,
    fontWeight: 'bold',
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  detailsCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  detailsTitle: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[100],
  },
  detailLabel: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  detailValue: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '500',
  },
  partnersSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  partnerCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  partnerLocation: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  partnerBonus: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: 'bold',
  },
});
