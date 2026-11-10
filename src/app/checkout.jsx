import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useHotelBooking } from '../data';
import { CustomButton } from '../components/CustomButton';

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { hotels, addBooking } = useHotelBooking();

  const hotel = hotels.find((h) => h.id === params.hotelId) || hotels[2];
  const [selectedMethod, setSelectedMethod] = useState('gpay');
  const [loading, setLoading] = useState(false);

  const amountToPay = params.total || '6999.00';

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const booking = addBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelCity: hotel.city,
        guestName: params.guestName || 'Pritam Prakash',
        contactNumber: params.contactNumber || '+91-8926581020',
        checkIn: params.checkIn || '27 May, 2026',
        checkOut: params.checkOut || '30 May, 2026',
        nights: 3,
        guests: '1 Adult',
        roomType: params.roomType || '1 Single Deluxe Room',
        amountPaid: parseFloat(amountToPay),
        paymentMethod:
          selectedMethod === 'gpay'
            ? 'Google Pay'
            : selectedMethod === 'paytm'
            ? 'Paytm'
            : selectedMethod === 'visa'
            ? 'VISA (**** 4022)'
            : 'MasterCard (**** 8821)',
        imageKey: hotel.imageKey,
      });

      router.replace({
        pathname: '/booking-confirmation',
        params: { bookingId: booking.id },
      });
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Amount Box */}
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>Amount to be paid</Text>
          <Text style={styles.amountValue}>₹{amountToPay}</Text>
          <Text style={styles.bookingRefText}>For: {hotel.name}</Text>
        </View>

        <Text style={styles.sectionHeading}>Choose a payment method</Text>

        {/* Payment Methods */}
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'gpay' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('gpay')}
        >
          <Ionicons
            name={selectedMethod === 'gpay' ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={colors.primary}
          />
          <Image
            source={require('../../assets/images/pay_gpay.png')}
            style={styles.payIcon}
            resizeMode="contain"
          />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>Google Pay</Text>
            <Text style={styles.methodSub}>Instant UPI Direct Transfer</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'paytm' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('paytm')}
        >
          <Ionicons
            name={selectedMethod === 'paytm' ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={colors.primary}
          />
          <Image
            source={require('../../assets/images/pay_paytm.png')}
            style={styles.payIcon}
            resizeMode="contain"
          />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>Paytm</Text>
            <Text style={styles.methodSub}>Wallet / UPI</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'visa' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('visa')}
        >
          <Ionicons
            name={selectedMethod === 'visa' ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={colors.primary}
          />
          <Image
            source={require('../../assets/images/pay_visa.png')}
            style={styles.payIcon}
            resizeMode="contain"
          />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>VISA Debit / Credit Card</Text>
            <Text style={styles.methodSub}>Ending in •••• 4022</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'mastercard' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('mastercard')}
        >
          <Ionicons
            name={selectedMethod === 'mastercard' ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={colors.primary}
          />
          <Image
            source={require('../../assets/images/pay_mastercard.png')}
            style={styles.payIcon}
            resizeMode="contain"
          />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>MasterCard</Text>
            <Text style={styles.methodSub}>Ending in •••• 8821</Text>
          </View>
        </TouchableOpacity>

        <CustomButton
          title={`Pay ₹${amountToPay}`}
          onPress={handlePay}
          loading={loading}
          style={styles.payBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  amountBox: {
    backgroundColor: colors.secondary,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  amountLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  amountValue: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 4,
  },
  bookingRefText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  selectedMethod: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  payIcon: {
    width: 36,
    height: 24,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  methodSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  payBtn: {
    marginTop: spacing.lg,
  },
});
