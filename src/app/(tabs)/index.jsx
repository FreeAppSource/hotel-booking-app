import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { HotelCard } from '../../components/HotelCard';
import { CustomButton } from '../../components/CustomButton';
import { useHotelBooking } from '../../data';

export default function ExploreScreen() {
  const router = useRouter();
  const { hotels, searchParams, setSearchParams } = useHotelBooking();

  const [hasSearched, setHasSearched] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [peopleModal, setPeopleModal] = useState(false);
  const [roomModal, setRoomModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  // Filtered hotels based on current search parameters
  const displayedHotels = hotels.filter((h) => {
    if (searchParams.city && h.city.toLowerCase() !== searchParams.city.toLowerCase()) {
      return false;
    }
    return true;
  });

  const featuredHotels = hotels.filter((h) => h.featured);

  return (
    <View style={styles.container}>
      {/* Top App Header */}
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>Explore</Text>
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => router.push('/past-bookings')}
        >
          <Ionicons name="receipt-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Booking Widget Box */}
        <View style={styles.searchCard}>
          {/* Location Selector */}
          <TouchableOpacity
            style={styles.searchRow}
            onPress={() => setCityModal(true)}
          >
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <View style={styles.searchField}>
              <Text style={styles.searchLabel}>City / Location</Text>
              <Text style={styles.searchValue}>{searchParams.city}</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Date Selector */}
          <TouchableOpacity
            style={styles.searchRow}
            onPress={() => setDateModal(true)}
          >
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            <View style={styles.searchField}>
              <Text style={styles.searchLabel}>Check In - Check Out</Text>
              <Text style={styles.searchValue}>
                {searchParams.checkIn} - {searchParams.checkOut}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* People & Rooms Selector */}
          <View style={styles.inlineSelectors}>
            <TouchableOpacity
              style={[styles.searchRow, { flex: 1 }]}
              onPress={() => setPeopleModal(true)}
            >
              <Ionicons name="people-outline" size={20} color={colors.primary} />
              <View style={styles.searchField}>
                <Text style={styles.searchLabel}>Guests</Text>
                <Text style={styles.searchValue}>
                  {searchParams.adults} Adult{searchParams.adults > 1 ? 's' : ''}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity
              style={[styles.searchRow, { flex: 1.2 }]}
              onPress={() => setRoomModal(true)}
            >
              <Ionicons name="bed-outline" size={20} color={colors.primary} />
              <View style={styles.searchField}>
                <Text style={styles.searchLabel}>Rooms</Text>
                <Text style={styles.searchValue} numberOfLines={1}>
                  {searchParams.roomType}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <CustomButton
            title={hasSearched ? 'Search Again' : 'Search Hotels'}
            onPress={() => setHasSearched(true)}
            style={styles.searchBtn}
          />
        </View>

        {/* AFTER SEARCH RESULTS OR DEFAULT EXPLORE */}
        {hasSearched ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Available in {searchParams.city}</Text>
                <Text style={styles.sectionSubtitle}>
                  {displayedHotels.length} verified stays available
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/top-hotels')}>
                <Text style={styles.viewAll}>Filter / Sort</Text>
              </TouchableOpacity>
            </View>

            {displayedHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </View>
        ) : (
          <>
            {/* Featured Luxury Carousel */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Stays</Text>
                <TouchableOpacity onPress={() => router.push('/top-hotels')}>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {featuredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} horizontal />
                ))}
              </ScrollView>
            </View>

            {/* Top Hotels Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Hotels</Text>
                <TouchableOpacity onPress={() => router.push('/top-hotels')}>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              {hotels.slice(0, 4).map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* City Modal */}
      <Modal visible={cityModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Select Destination</Text>
            {['Bangalore', 'Mumbai', 'Goa', 'Delhi', 'Dubai'].map((city) => (
              <TouchableOpacity
                key={city}
                style={styles.modalOption}
                onPress={() => {
                  setSearchParams((prev) => ({ ...prev, city }));
                  setCityModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, searchParams.city === city && styles.activeModalText]}>
                  {city}
                </Text>
                {searchParams.city === city && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setCityModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal visible={dateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Choose Travel Dates</Text>
            {[
              { in: '27 May, 2026', out: '30 May, 2026' },
              { in: '01 Jun, 2026', out: '05 Jun, 2026' },
              { in: '12 Jun, 2026', out: '15 Jun, 2026' },
              { in: '20 Jul, 2026', out: '25 Jul, 2026' },
            ].map((d, i) => (
              <TouchableOpacity
                key={i}
                style={styles.modalOption}
                onPress={() => {
                  setSearchParams((prev) => ({ ...prev, checkIn: d.in, checkOut: d.out }));
                  setDateModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{d.in} — {d.out}</Text>
                {searchParams.checkIn === d.in && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setDateModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* People / Guests Modal */}
      <Modal visible={peopleModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>No. of People</Text>
            <View style={styles.stepperRow}>
              <View>
                <Text style={styles.stepperTitle}>Adults</Text>
                <Text style={styles.stepperSub}>12+ years</Text>
              </View>
              <View style={styles.stepperControls}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setSearchParams((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                >
                  <Ionicons name="remove" size={16} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.stepVal}>{searchParams.adults}</Text>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setSearchParams((p) => ({ ...p, adults: p.adults + 1 }))}
                >
                  <Ionicons name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.stepperRow}>
              <View>
                <Text style={styles.stepperTitle}>Children</Text>
                <Text style={styles.stepperSub}>2-11 years</Text>
              </View>
              <View style={styles.stepperControls}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setSearchParams((p) => ({ ...p, children: Math.max(0, p.children - 1) }))}
                >
                  <Ionicons name="remove" size={16} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.stepVal}>{searchParams.children}</Text>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setSearchParams((p) => ({ ...p, children: p.children + 1 }))}
                >
                  <Ionicons name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            <CustomButton title="Confirm Guests" onPress={() => setPeopleModal(false)} style={{ marginTop: spacing.md }} />
          </View>
        </View>
      </Modal>

      {/* Room Modal */}
      <Modal visible={roomModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>No. of Rooms & Package</Text>
            {[
              '1 Single Deluxe Room',
              'Double Bed + Free Breakfast',
              'Double Bed + Free Meals',
              'Premium Suite',
              'Extra Bed for children',
            ].map((room) => (
              <TouchableOpacity
                key={room}
                style={styles.modalOption}
                onPress={() => {
                  setSearchParams((prev) => ({ ...prev, roomType: room }));
                  setRoomModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, searchParams.roomType === room && styles.activeModalText]}>
                  {room}
                </Text>
                {searchParams.roomType === room && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setRoomModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  notificationBtn: {
    padding: 6,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  searchCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 6,
  },
  searchField: {
    flex: 1,
  },
  searchLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  searchValue: {
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
  inlineSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.borderLight,
    marginHorizontal: 8,
  },
  searchBtn: {
    marginTop: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  viewAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingVertical: 4,
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
  modalHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalOptionText: {
    fontSize: 14,
    color: colors.text,
  },
  activeModalText: {
    color: colors.primary,
    fontWeight: '700',
  },
  modalCancel: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: 10,
  },
  modalCancelText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  stepperTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  stepperSub: {
    fontSize: 12,
    color: colors.textMuted,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  stepVal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
});
