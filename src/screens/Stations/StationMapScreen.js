import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { useStationStore } from '../../store/stationStore';
import { Loading } from '../../components/common/Loading';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const StationMapScreen = ({ navigation }) => {
  const { stations, isLoading, fetchStations } = useStationStore();
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.1772,
    longitude: 44.5035,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    fetchStations();
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getMarkerColor = (status) => {
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
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude || 40.1772,
              longitude: station.longitude || 44.5035,
            }}
            pinColor={getMarkerColor(station.status)}
          >
            <Callout
              onPress={() => navigation.navigate('StationDetails', { stationId: station.id })}
            >
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{station.name}</Text>
                <Text style={styles.calloutStatus}>{station.status}</Text>
                <Text style={styles.calloutPrice}>${station.price || 0.25}/kWh</Text>
                <TouchableOpacity style={styles.calloutButton}>
                  <Text style={styles.calloutButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={getLocation}
      >
        <Feather name="crosshair" size={24} color={colors.primary.main} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.xl,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  callout: {
    padding: spacing.sm,
    minWidth: 150,
  },
  calloutTitle: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  calloutStatus: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  calloutPrice: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '600',
  },
  calloutButton: {
    marginTop: spacing.xs,
    padding: spacing.xs,
    backgroundColor: colors.primary.main,
    borderRadius: 4,
    alignItems: 'center',
  },
  calloutButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '500',
  },
});
