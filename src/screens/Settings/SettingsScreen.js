import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const SettingsScreen = () => {
  const { logout } = useAuthStore();
  const {
    language,
    city,
    notificationsEnabled,
    setLanguage,
    setCity,
    toggleNotifications,
  } = useSettingsStore();

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  const languages = [
    { code: 'hy', name: 'Հայերեն' },
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
  ];

  const cities = [
    { id: 'yerevan', name: 'Երևան' },
    { id: 'ejmiatsin', name: 'Էջմիածին' },
  ];

  const settingsItems = [
    {
      icon: 'globe',
      label: 'Language',
      value: languages.find(l => l.code === language)?.name || 'English',
      onPress: () => setShowLanguageModal(true),
    },
    {
      icon: 'map-pin',
      label: 'City',
      value: cities.find(c => c.id === city)?.name || 'Yerevan',
      onPress: () => setShowCityModal(true),
    },
    {
      icon: 'bell',
      label: 'Notifications',
      value: (
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: colors.grey[300], true: colors.primary.main }}
        />
      ),
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <Card style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Feather name="user" size={32} color={colors.white} />
          </View>
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john@example.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.settingsCard}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.settingItem,
              index < settingsItems.length - 1 && styles.settingItemBorder,
            ]}
            onPress={item.onPress}
            disabled={!item.onPress}
          >
            <View style={styles.settingLeft}>
              <Feather name={item.icon} size={20} color={colors.text.primary} />
              <Text style={styles.settingLabel}>{item.label}</Text>
            </View>
            <View style={styles.settingRight}>
              {typeof item.value === 'string' ? (
                <Text style={styles.settingValue}>{item.value}</Text>
              ) : (
                item.value
              )}
              {item.onPress && (
                <Feather name="chevron-right" size={16} color={colors.grey[400]} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>About</Text>
        <Text style={styles.infoText}>TuTak App v1.0.0</Text>
        <Text style={styles.infoText}>© 2024 TuTak. All rights reserved.</Text>
      </Card>

      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
      />
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
  profileCard: {
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profileName: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  profileEmail: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  editButton: {
    padding: spacing.sm,
  },
  editButtonText: {
    ...typography.button,
    color: colors.primary.main,
  },
  settingsCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[100],
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    ...typography.body1,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    ...typography.body2,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  infoCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  infoTitle: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  infoText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  logoutButton: {
    margin: spacing.md,
    marginTop: spacing.lg,
  },
});
