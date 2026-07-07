import React from 'react';
import { View, Text, StyleSheet, Share, TouchableOpacity } from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';
import { Feather } from '@expo/vector-icons';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const QRCode = ({
  referralLink,
  referralCode,
  onShare,
  size = 200,
}) => {
  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else {
      try {
        await Share.share({
          message: `Join me on TuTak! Use my referral code: ${referralCode}\n${referralLink}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.qrContainer}>
        {referralLink ? (
          <QRCodeSVG
            value={referralLink}
            size={size}
            color={colors.primary.main}
            backgroundColor={colors.white}
          />
        ) : (
          <View style={styles.placeholder}>
            <Feather name="qrcode" size={60} color={colors.grey[400]} />
          </View>
        )}
      </View>

      {referralCode && (
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Your referral code</Text>
          <Text style={styles.code}>{referralCode}</Text>
        </View>
      )}

      <Button
        title="Share referral link"
        onPress={handleShare}
        icon={<Feather name="share-2" size={18} color={colors.white} />}
        style={styles.shareButton}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  qrContainer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  placeholder: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey[100],
    borderRadius: 8,
  },
  codeContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  codeLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  code: {
    ...typography.h4,
    color: colors.primary.main,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  shareButton: {
    width: '100%',
  },
});
