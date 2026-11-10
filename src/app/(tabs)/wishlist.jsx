import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../../theme';
import { HotelCard } from '../../components/HotelCard';
import { CustomButton } from '../../components/CustomButton';
import { useHotelBooking } from '../../data';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist, hotels } = useHotelBooking();

  const savedHotels = hotels.filter((h) => wishlist.includes(h.id));

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.countBadge}>{savedHotels.length} Saved Stays</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {savedHotels.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on any hotel card to save your favorite accommodations.
            </Text>
            <CustomButton
              title="Explore Hotels"
              onPress={() => router.push('/(tabs)')}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        ) : (
          savedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  countBadge: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 260,
    lineHeight: 18,
  },
});
