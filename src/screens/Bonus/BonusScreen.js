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
                    name={transaction.type === '
