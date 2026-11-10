import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';
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

export const HotelCard = ({ hotel, horizontal = false }) => {
  const router = useRouter();
  const { toggleWishlist, isWishlisted } = useHotelBooking();
  const wishlisted = isWishlisted(hotel.id);

  const handlePress = () => {
    router.push({
      pathname: '/hotel-detail',
      params: { id: hotel.id },
    });
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    router.push({
      pathname: '/booking',
      params: { id: hotel.id },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.card, horizontal ? styles.horizontalCard : styles.fullCard]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={getHotelImage(hotel.imageKey)}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleWishlist(hotel.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>

        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{hotel.matchScore}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{hotel.name}</Text>
          <View style={styles.starRow}>
            {[...Array(hotel.star)].map((_, i) => (
              <Ionicons key={i} name="star" size={12} color={colors.star} />
            ))}
          </View>
        </View>

        <Text style={styles.metaText}>
          {hotel.star} star hotel • {hotel.city} ({hotel.area})
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceCol}>
            <View style={styles.priceLine}>
              <Text style={styles.price}>₹{hotel.price}</Text>
              {hotel.originalPrice > hotel.price && (
                <Text style={styles.originalPrice}>₹{hotel.originalPrice}</Text>
              )}
            </View>
            <Text style={styles.perNight}>per night</Text>
          </View>

          <TouchableOpacity
            style={styles.bookBtn}
            onPress={handleBookNow}
            activeOpacity={0.8}
          >
            <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  horizontalCard: {
    width: 260,
    marginRight: spacing.md,
  },
  fullCard: {
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    position: 'relative',
    backgroundColor: colors.borderLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  matchText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 6,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.xs,
  },
  priceCol: {
    justifyContent: 'center',
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  perNight: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bookBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.xs,
  },
  bookBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
