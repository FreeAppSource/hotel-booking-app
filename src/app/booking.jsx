import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useHotelBooking } from '../data';
import { CustomButton } from '../components/CustomButton';

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { hotels, searchParams, userProfile } = useHotelBooking();

  const hotel = hotels.find((h) => h.id === id) || hotels[2];

  // Booking Form State matching artboards 5, 8, 9, 10
  const [name, setName] = useState('Pritam Prakash');
  const [phone, setPhone] = useState('+91-8926581020');
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guests, setGuests] = useState('1 Adult');
  const [roomType, setRoomType] = useState('1 Single Deluxe Room');

  const [dateModal, setDateModal] = useState(false);
  const [peopleModal, setPeopleModal] = useState(false);
  const [roomModal, setRoomModal] = useState(false);

  const nights = 3;
  const taxes = 840.00;
  const totalAmount = hotel.price + taxes;

  const handleProceedToPayment = () => {
    router.push({
      pathname: '/checkout',
      params: {
        hotelId: hotel.id,
        guestName: name,
        contactNumber: phone,
        checkIn,
        checkOut,
        roomType,
        total: totalAmount.toFixed(2),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hotel Summary Card */}
        <View style={styles.hotelCard}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <Text style={styles.hotelLocation}>{hotel.city} ({hotel.area})</Text>
          <Text style={styles.hotelPrice}>₹{hotel.price} / night</Text>
        </View>

        {/* Guest Details Form */}
        <View style={styles.formCard}>
          <Text style={styles.cardHeading}>Primary Guest</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Pritam Prakash"
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+91-8926581020"
            keyboardType="phone-pad"
          />
        </View>

        {/* Stay Parameters (Dates, Guests, Rooms) */}
        <View style={styles.formCard}>
          <Text style={styles.cardHeading}>Stay Dates & Room Selection</Text>

          <TouchableOpacity
            style={styles.sheetRow}
            onPress={() => setDateModal(true)}
          >
            <View>
              <Text style={styles.sheetLabel}>Check In - Check Out</Text>
              <Text style={styles.sheetValue}>{checkIn} — {checkOut} ({nights} Nights)</Text>
            </View>
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.sheetRow}
            onPress={() => setPeopleModal(true)}
          >
            <View>
              <Text style={styles.sheetLabel}>No. of People</Text>
              <Text style={styles.sheetValue}>{guests}</Text>
            </View>
            <Ionicons name="people-outline" size={20} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.sheetRow}
            onPress={() => setRoomModal(true)}
          >
            <View>
              <Text style={styles.sheetLabel}>No. of Rooms / Package</Text>
              <Text style={styles.sheetValue}>{roomType}</Text>
            </View>
            <Ionicons name="bed-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceCard}>
          <Text style={styles.cardHeading}>Price Summary</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Room Charges ({nights} nights)</Text>
            <Text style={styles.priceVal}>₹{hotel.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>GST & Service Taxes (12%)</Text>
            <Text style={styles.priceVal}>₹{taxes.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalPriceRow]}>
            <Text style={styles.totalPriceLabel}>Total Amount to be Paid</Text>
            <Text style={styles.totalPriceVal}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <CustomButton
          title="Proceed to Payment"
          onPress={handleProceedToPayment}
          style={styles.proceedBtn}
        />
      </ScrollView>

      {/* Date Modal */}
      <Modal visible={dateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Travel Dates</Text>
            {[
              { in: '27 May, 2026', out: '30 May, 2026' },
              { in: '02 Jun, 2026', out: '05 Jun, 2026' },
              { in: '15 Jun, 2026', out: '18 Jun, 2026' },
            ].map((d, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.modalOption}
                onPress={() => {
                  setCheckIn(d.in);
                  setCheckOut(d.out);
                  setDateModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{d.in} — {d.out}</Text>
                {checkIn === d.in && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setDateModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Guests Modal */}
      <Modal visible={peopleModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>No. of People</Text>
            {[
              '1 Adult',
              '2 Adults',
              '2 Adults + 1 Child (2-11 years)',
              '2 Adults + 1 Infant (< 2 years)',
              '3 Adults (12-15 years)',
            ].map((g) => (
              <TouchableOpacity
                key={g}
                style={styles.modalOption}
                onPress={() => {
                  setGuests(g);
                  setPeopleModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{g}</Text>
                {guests === g && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPeopleModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Room Modal */}
      <Modal visible={roomModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>No. of Rooms & Package</Text>
            {[
              '1 Single Deluxe Room',
              'Double Bed + Free Breakfast',
              'Double Bed + Free Meals',
              'Premium Suite',
              'Extra Matress for children',
            ].map((r) => (
              <TouchableOpacity
                key={r}
                style={styles.modalOption}
                onPress={() => {
                  setRoomType(r);
                  setRoomModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{r}</Text>
                {roomType === r && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setRoomModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  hotelCard: {
    backgroundColor: colors.secondary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
  },
  hotelLocation: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  hotelPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accent,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.md,
    height: 44,
    fontSize: 14,
    color: colors.text,
  },
  sheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sheetLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  sheetValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 4,
  },
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  priceLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  priceVal: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  totalPriceRow: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
    marginTop: 6,
  },
  totalPriceLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  totalPriceVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  proceedBtn: {
    marginBottom: spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalOptionText: {
    fontSize: 14,
    color: colors.text,
  },
  cancelBtn: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: 10,
  },
  cancelText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
});
