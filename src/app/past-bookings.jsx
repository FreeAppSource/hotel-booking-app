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
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { Header } from '../components/Header';
import { useHotelBooking } from '../data';

const getHotelImage = (key) => {
  switch (key) {
    case 'hotel_sheraton.png':
      return require('../assets/images/hotel_sheraton.png');
    case 'hotel_taj_vista.png':
      return require('../assets/images/hotel_taj_vista.png');
    case 'hotel_park_plaza.png':
      return require('../assets/images/hotel_park_plaza.png');
    case 'hotel_lotus_park.png':
      return require('../assets/images/hotel_lotus_park.png');
    case 'hotel_goldfinch.png':
      return require('../assets/images/hotel_goldfinch.png');
    case 'hotel_sarovar.png':
      return require('../assets/images/hotel_sarovar.png');
    case 'hotel_taj_westside.png':
      return require('../assets/images/hotel_taj_westside.png');
    case 'hotel_pride.png':
      return require('../assets/images/hotel_pride.png');
    default:
      return require('../assets/images/hotel_park_plaza.png');
  }
};

export default function PastBookingsScreen() {
  const { bookings } = useHotelBooking();

  return (
    <View style={styles.container}>
      <Header title="My Bookings" subtitle="Past & Upcoming Reservations" showBack />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={60} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No past reservations</Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.topRow}>
                <Image
                  source={getHotelImage(booking.imageKey)}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <View style={styles.infoCol}>
                  <Text style={styles.hotelName}>{booking.hotelName}</Text>
                  <Text style={styles.cityText}>{booking.hotelCity}</Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{booking.status}</Text>
                    </View>
                    <Text style={styles.idText}>#{booking.id}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.metaRow}>
                <View>
                  <Text style={styles.metaLabel}>Check In</Text>
                  <Text style={styles.metaVal}>{booking.checkIn}</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Check Out</Text>
                  <Text style={styles.metaVal}>{booking.checkOut}</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Paid Amount</Text>
                  <Text style={styles.metaValPrice}>₹{booking.amountPaid?.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.receiptBtn}
                  onPress={() => Alert.alert('Receipt Downloaded', `Receipt for booking #${booking.id} has been saved to your downloads.`)}
                >
                  <Ionicons name="download-outline" size={16} color={colors.primary} />
                  <Text style={styles.receiptText}>Download Invoice</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: radius.xs,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cityText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 6,
  },
  statusBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  idText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  metaLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  metaVal: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  metaValPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  actionRow: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.xs,
  },
  receiptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  receiptText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
});
