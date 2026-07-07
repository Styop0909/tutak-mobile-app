import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useReferralStore } from '../../store/referralStore';
import { QRCode } from '../../components/referral/QRCode';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const ReferralScreen = () => {
  const {
    referralData,
    isLoading,
    fetchReferralData,
  } = useReferralStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReferralData();
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
      <QRCode
        referralLink={referralData?.link}
        referralCode={referralData?.code}
      />

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{referralData?.totalReferrals || 0}</Text>
            <Text style={styles.statLabel}>Total Referrals</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{referralData?.activeReferrals || 0}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{referralData?.bonusEarned || 0}</Text>
            <Text style={styles.statLabel}>Bonus Earned</Text>
          </View>
        </View>
      </Card>

      {referralData?.referredUsers?.length > 0 && (
        <View style={styles.referredSection}>
          <Text style={styles.sectionTitle}>Referred Friends</Text>
          {referralData.referredUsers.map((user, index) => (
            <Card key={index} style={styles.userCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name || user.phone}</Text>
                <Text style={styles.userDate}>{user.joinedDate}</Text>
              </View>
              <Text style={[styles.userStatus, user.isActive ? styles.active : styles.inactive]}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Text>
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
  statsCard: {
    marginHorizontal: spacing.md,
    padding: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h4,
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  referredSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  userCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  userDate: {
    ...typography.caption,
    color: colors.text.hint,
    marginTop: spacing.xs,
  },
  userStatus: {
    ...typography.body2,
    fontWeight: '500',
  },
  active: {
    color: colors.success,
  },
  inactive: {
    color: colors.grey[400],
  },
});
