import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useStationStore } from '../../store/stationStore';
import { Card } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const StationsScreen = ({ navigation }) => {
  const { stations, isLoading, fetchStations } = useStationStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStations();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available': return colors.success;
      case 'charging': return colors.warning;
      case 'occupied': return colors.error;
      default: return colors.grey[500];
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate('StationMap')}
      >
        <Feather name="map" size={20} color={colors.white} />
        <Text style={styles.mapButtonText}>View Map</Text>
      </TouchableOpacity>

      <FlatList
        data={stations}
        renderItem={({ item }) => (
          <Card style={styles.stationCard}>
            <View style={styles.stationHeader}>
              <Text style={styles.stationName}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.stationDetails}>
              <View style={styles.detailItem}>
                <Feather name="map-pin" size={14} color={colors.text.secondary} />
                <Text style={styles.detailText}>{item.address}</Text>
              </View>
              <View style={styles.detailItem}>
                <Feather name="zap" size={14} color={colors.text.secondary} />
                <Text style={styles.detailText}>{item.power || '50kW'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Feather name="clock" size={14} color={colors.text.secondary} />
                <Text style={styles.detailText}>{item.hours || '24/7'}</Text>
              </View>
            </View>

            <View style={styles.stationFooter}>
              <Text style={styles.priceText}>
                ${item.price || 0.25}/kWh
              </Text>
              <TouchableOpacity style={styles.navigateButton}>
                <Feather name="navigation" size={16} color={colors.primary.main} />
                <Text style={styles.navigateText}>Navigate</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.stationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="battery-charging" size={60} color={colors.grey[400]} />
            <Text style={styles.emptyText}>No stations available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
  },
  mapButtonText: {
    ...typography.button,
    color: colors.white,
    marginLeft: spacing.xs,
  },
  stationsList: {
    padding: spacing.md,
  },
  stationCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationName: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '500',
  },
  stationDetails: {
    marginTop: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  stationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.grey[200],
  },
  priceText: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigateText: {
    ...typography.body2,
    color: colors.primary.main,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body1,
    color: colors.text.hint,
    marginTop: spacing.md,
  },
});
