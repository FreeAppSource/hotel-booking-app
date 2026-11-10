import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { useHotelBooking } from '../../data';

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile, bookings } = useHotelBooking();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of your hotel booking account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/auth') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Header Card */}
        <View style={styles.userCard}>
          <Image
            source={require('../../assets/images/avatar_kiran.png')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            <View style={styles.tierBadge}>
              <Ionicons name="shield-checkmark" size={12} color={colors.secondary} />
              <Text style={styles.tierText}>{userProfile.memberTier}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/past-bookings')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="receipt-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Past Bookings</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.bookingBadge}>{bookings.length} Bookings</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('My Account', `Name: ${userProfile.name}\nEmail: ${userProfile.email}\nPhone: ${userProfile.phone}`)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>My Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Payments & Refunds', 'All payment receipts & refundable cancellations are logged in your account statement.')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="card-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Payments & Refunds</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Help & Support', '24/7 Concierge Hotline: +91-1800-400-999\nEmail: concierge@hotelapp.com')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Privacy Policy', 'Your personal information and credit credentials are encrypted with 256-bit bank-level TLS protocol.')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              <Text style={[styles.menuTitle, styles.logoutTitle]}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    paddingTop: 50,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    marginRight: spacing.md,
    backgroundColor: colors.borderLight,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondary,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookingBadge: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutTitle: {
    color: colors.danger,
    fontWeight: '600',
  },
});
