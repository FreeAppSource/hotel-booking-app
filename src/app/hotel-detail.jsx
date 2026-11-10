import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useHotelBooking } from '../data';
import { CustomButton } from '../components/CustomButton';

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

const amenityIcons = {
  'Free WiFi': 'wifi',
  'Breakfast': 'restaurant',
  'Pets': 'paw',
  'Bar': 'wine',
  'Pool': 'water',
  'Gym': 'barbell',
  'Spa': 'flower',
  'Parking': 'car',
  'Airport Shuttle': 'airplane',
  'Valet': 'key',
  'Tennis': 'tennisball',
};

export default function HotelDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { hotels, isWishlisted, toggleWishlist, reviews } = useHotelBooking();

  const [expandedDesc, setExpandedDesc] = useState(false);

  const hotel = hotels.find((h) => h.id === id) || hotels[2]; // Default to Park Plaza matching artboard
  const wishlisted = isWishlisted(hotel.id);

  const hotelReviews = reviews.filter((r) => r.hotelId === hotel.id || hotel.id === 'h3');

  const handleCall = () => {
    Linking.openURL(`tel:${hotel.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${hotel.email}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{hotel.name}</Text>
        <TouchableOpacity onPress={() => toggleWishlist(hotel.id)} style={styles.navBtn}>
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={24}
            color={wishlisted ? colors.primary : colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Gallery Image */}
        <View style={styles.heroWrapper}>
          <Image
            source={getHotelImage(hotel.imageKey)}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.galleryBadge}>
            <Ionicons name="images" size={14} color={colors.white} />
            <Text style={styles.galleryText}>Gallery</Text>
          </View>
        </View>

        {/* Title & Location */}
        <View style={styles.headerCard}>
          <View style={styles.titleRow}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{hotel.matchScore} Match</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addressRow}
            onPress={() => Alert.alert('Map Location', hotel.address)}
          >
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.addressText}>{hotel.address} - Show in Map</Text>
          </TouchableOpacity>

          {/* Contact Row */}
          <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactChip} onPress={handlePhoneCall => handleCall()}>
              <Ionicons name="call" size={14} color={colors.secondary} />
              <Text style={styles.contactText}>{hotel.phone}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactChip} onPress={handleEmail}>
              <Ionicons name="mail" size={14} color={colors.secondary} />
              <Text style={styles.contactText}>{hotel.email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Amenities Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {hotel.amenities.map((item) => (
              <View key={item} style={styles.amenityItem}>
                <View style={styles.amenityIconCircle}>
                  <Ionicons
                    name={amenityIcons[item] || 'checkmark-circle-outline'}
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.amenityLabel}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Hotel Description Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>About Hotel</Text>
          <Text
            style={styles.descriptionText}
            numberOfLines={expandedDesc ? undefined : 4}
          >
            {hotel.description}
          </Text>
          <TouchableOpacity onPress={() => setExpandedDesc(!expandedDesc)} style={styles.readMoreBtn}>
            <Text style={styles.readMoreText}>{expandedDesc ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Summary Link */}
        <TouchableOpacity
          style={styles.reviewBanner}
          onPress={() => router.push({ pathname: '/reviews', params: { hotelId: hotel.id } })}
        >
          <View style={styles.reviewLeft}>
            <Text style={styles.reviewScore}>{hotel.rating} ★</Text>
            <View>
              <Text style={styles.reviewTitle}>Guest Ratings</Text>
              <Text style={styles.reviewSub}>{hotel.reviewsCount} verified reviews</Text>
            </View>
          </View>
          <View style={styles.reviewRight}>
            <Text style={styles.seeReviews}>See All</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPrice}>₹{hotel.price}</Text>
          <Text style={styles.bottomPerNight}>per night (excl. taxes)</Text>
        </View>

        <CustomButton
          title="Book Now"
          onPress={() => router.push({ pathname: '/booking', params: { id: hotel.id } })}
          style={styles.bookCta}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navBtn: {
    padding: 6,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 90,
  },
  heroWrapper: {
    width: '100%',
    height: 240,
    backgroundColor: colors.borderLight,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  galleryBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.xs,
  },
  galleryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  headerCard: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  matchBadge: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  matchText: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: '700',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.sm,
  },
  addressText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: 4,
  },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  sectionCard: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  amenityItem: {
    alignItems: 'center',
    width: 60,
  },
  amenityIconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  amenityLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  readMoreBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  reviewBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  reviewScore: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.accent,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  reviewSub: {
    fontSize: 12,
    color: colors.textMuted,
  },
  reviewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeReviews: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  bottomPerNight: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bookCta: {
    paddingHorizontal: spacing.xl,
  },
});
