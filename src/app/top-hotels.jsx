import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { Header } from '../components/Header';
import { HotelCard } from '../components/HotelCard';
import { useHotelBooking } from '../data';

export default function TopHotelsScreen() {
  const { hotels } = useHotelBooking();
  const [selectedCity, setSelectedCity] = useState('All');
  const [filterStar, setFilterStar] = useState('All');
  const [sortBy, setSortBy] = useState('match');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredHotels = hotels.filter((h) => {
    if (selectedCity !== 'All' && h.city !== selectedCity) return false;
    if (filterStar !== 'All' && h.star !== parseInt(filterStar, 10)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <View style={styles.container}>
      <Header title="Top Hotels" subtitle="Bangalore & Beyond" showBack />

      {/* Filter Action Bar */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityChips}>
          {['All', 'Bangalore', 'Whitefield', 'Indiranagar', 'Marathahalli'].map((city) => (
            <TouchableOpacity
              key={city}
              style={[styles.chip, selectedCity === city && styles.activeChip]}
              onPress={() => setSelectedCity(city)}
            >
              <Text style={[styles.chipText, selectedCity === city && styles.activeChipText]}>
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="options-outline" size={18} color={colors.text} />
          <Text style={styles.filterBtnText}>Filter By</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsCount}>
          Showing {filteredHotels.length} luxury stays
        </Text>

        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter & Sort Hotels</Text>

            <Text style={styles.filterHeading}>Sort By</Text>
            {[
              { key: 'match', label: 'Recommended Match %' },
              { key: 'price_low', label: 'Price: Low to High' },
              { key: 'price_high', label: 'Price: High to Low' },
              { key: 'rating', label: 'Guest Rating (Stars)' },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={styles.modalOption}
                onPress={() => setSortBy(opt.key)}
              >
                <Text style={[styles.modalOptionText, sortBy === opt.key && styles.activeOptionText]}>
                  {opt.label}
                </Text>
                {sortBy === opt.key && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}

            <Text style={[styles.filterHeading, { marginTop: spacing.md }]}>Star Rating</Text>
            <View style={styles.starsRow}>
              {['All', '5', '4', '3'].map((star) => (
                <TouchableOpacity
                  key={star}
                  style={[styles.starPill, filterStar === star && styles.activeStarPill]}
                  onPress={() => setFilterStar(star)}
                >
                  <Text style={[styles.starPillText, filterStar === star && styles.activeStarPillText]}>
                    {star === 'All' ? 'All Stars' : `${star} ★`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyBtnText}>Apply Filters</Text>
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
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cityChips: {
    gap: 6,
    paddingRight: spacing.md,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeChip: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  chipText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeChipText: {
    color: colors.white,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  resultsCount: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: spacing.sm,
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  filterHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalOptionText: {
    fontSize: 14,
    color: colors.text,
  },
  activeOptionText: {
    color: colors.primary,
    fontWeight: '700',
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  starPill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radius.xs,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeStarPill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  starPillText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  activeStarPillText: {
    color: colors.white,
  },
  applyBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.xs,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  applyBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
