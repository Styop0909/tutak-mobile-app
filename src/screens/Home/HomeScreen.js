import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useBonusStore } from '../../store/bonusStore';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';

export const HomeScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const { balance, recentActivities, fetchBalance, isLoading } = useBonusStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBalance();
    setRefreshing(false);
  };

  const quickActions = [
    { icon: 'coffee', label: 'Menu', screen: 'Menu' },
    { icon: 'shopping-bag', label: 'Cart', screen: 'Cart' },
    { icon: 'gift', label: 'Bonus', screen: 'Bonus' },
    { icon: 'users', label: 'Referral', screen: 'Referral' },
  ];

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
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.name || 'User'}</Text>
      </View>

      <Card style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceTitle}>Available Bonus</Text>
          <Feather name="gift" size={24} color={colors.white} />
        </View>
        <Text style={styles.balanceAmount}>{balance || 0}</Text>
        <TouchableOpacity
          style={styles.bonusButton}
          onPress={() => navigation.navigate('Bonus')}
        >
          <Text style={styles.bonusButtonText}>View Details</Text>
          <Feather name="arrow-right" size={16} color={colors.white} />
        </TouchableOpacity>
      </Card>

      <View style={styles.quickActions}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.screen}
            style={styles.quickActionItem}
            onPress={() => navigation.navigate(action.screen)}
          >
            <View style={styles.quickActionIcon}>
              <Feather name={action.icon} size={24} color={colors.primary.main} />
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {recentActivities?.length > 0 ? (
          recentActivities.map((activity, index) => (
            <Card key={index} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <View style={styles.activityIcon}>
                  <Feather
                    name={activity.type === 'earned' ? 'plus' : 'minus'}
                    size={16}
                    color={activity.type === 'earned' ? colors.success : colors.error}
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.description}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                <Text
                  style={[
                    styles.activityAmount,
                    activity.type === 'earned'
                      ? styles.activityEarned
                      : styles.activitySpent,
                  ]}
                >
                  {activity.type === 'earned' ? '+' : '-'}{activity.amount}
                </Text>
              </View>
            </Card>
          ))
        ) : (
          <Text style={styles.emptyText}>No recent activities</Text>
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
  welcomeSection: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  welcomeText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  userName: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  balanceCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.primary.main,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceTitle: {
    ...typography.body1,
    color: colors.white,
    opacity: 0.9,
  },
  balanceAmount: {
    ...typography.h1,
    color: colors.white,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  bonusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary.dark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  bonusButtonText: {
    ...typography.button,
    color: colors.white,
    marginRight: spacing.xs,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.grey[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  recentSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  activityCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.grey[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    ...typography.body2,
    color: colors.text.primary,
  },
  activityDate: {
    ...typography.caption,
    color: colors.text.hint,
    marginTop: spacing.xs,
  },
  activityAmount: {
    ...typography.body1,
    fontWeight: 'bold',
  },
  activityEarned: {
    color: colors.success,
  },
  activitySpent: {
    color: colors.error,
  },
  emptyText: {
    ...typography.body2,
    color: colors.text.hint,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
