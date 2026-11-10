import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useHotelBooking } from '../data';
import { CustomButton } from '../components/CustomButton';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams();
  const { bookings } = useHotelBooking();

  const booking = bookings.find((b) => b.id === bookingId) || bookings[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark-sharp" size={48} color={colors.white} />
        </View>

        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>Your booking has been confirmed</Text>

        {/* Ticket Details Card matching artboard 6 */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Text style={styles.hotelName}>{booking?.hotelName}</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{booking?.status}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Booking ID</Text>
            <Text style={styles.detailValue}>#{booking?.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Guest Name</Text>
            <Text style={styles.detailValue}>{booking?.guestName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check In</Text>
            <Text style={styles.detailValue}>{booking?.checkIn}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check Out</Text>
            <Text style={styles.detailValue}>{booking?.checkOut}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Room Type</Text>
            <Text style={styles.detailValue}>{booking?.roomType}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Mode</Text>
            <Text style={styles.detailValue}>{booking?.paymentMethod}</Text>
          </View>

          <View style={[styles.detailRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹{booking?.amountPaid?.toFixed(2)}</Text>
          </View>
        </View>

        <CustomButton
          title="Go back to Home"
          onPress={() => router.replace('/(tabs)')}
          style={styles.homeBtn}
        />

        <TouchableOpacity
          style={styles.viewBookingsBtn}
          onPress={() => router.replace('/past-bookings')}
        >
          <Text style={styles.viewBookingsText}>View in Past Bookings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.xl,
  },
  ticketCard: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  hotelName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  statusPill: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  statusText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  homeBtn: {
    width: '100%',
  },
  viewBookingsBtn: {
    marginTop: spacing.md,
    padding: 8,
  },
  viewBookingsText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
