import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { Header } from '../components/Header';
import { useHotelBooking } from '../data';
import { CustomButton } from '../components/CustomButton';

const getReviewerAvatar = (key) => {
  switch (key) {
    case 'avatar_reviewer_1.png':
      return require('../assets/images/avatar_reviewer_1.png');
    case 'avatar_reviewer_2.png':
      return require('../assets/images/avatar_reviewer_2.png');
    case 'avatar_reviewer_3.png':
      return require('../assets/images/avatar_reviewer_3.png');
    case 'avatar_reviewer_4.png':
      return require('../assets/images/avatar_reviewer_4.png');
    default:
      return require('../assets/images/avatar_kiran.png');
  }
};

export default function ReviewsScreen() {
  const router = useRouter();
  const { hotelId } = useLocalSearchParams();
  const { reviews, addReview } = useHotelBooking();

  const [writeModal, setWriteModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handlePostReview = () => {
    if (!comment.trim()) {
      Alert.alert('Required', 'Please write your review comment.');
      return;
    }

    addReview({
      hotelId: hotelId || 'h3',
      name: 'Kiran',
      rating,
      title: title || 'Verified Experience',
      comment,
    });

    setWriteModal(false);
    setTitle('');
    setComment('');
    Alert.alert('Review Submitted', 'Thank you for rating your stay!');
  };

  return (
    <View style={styles.container}>
      <Header title="Guest Reviews" subtitle="Park Plaza" showBack />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Rating Banner matching artboard 18 */}
        <View style={styles.summaryCard}>
          <Text style={styles.scoreVal}>4.5</Text>
          <Text style={styles.scoreSub}>(out of 5)</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Ionicons key={i} name="star" size={16} color={colors.star} />
            ))}
          </View>
          <Text style={styles.ratingsCount}>25 Ratings</Text>

          <CustomButton
            title="Write a review"
            onPress={() => setWriteModal(true)}
            style={styles.writeReviewBtn}
          />
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {reviews.map((rev) => (
            <View key={rev.id} style={styles.reviewCard}>
              <View style={styles.revHeader}>
                <Image
                  source={getReviewerAvatar(rev.avatarKey)}
                  style={styles.revAvatar}
                />
                <View style={styles.revUserCol}>
                  <Text style={styles.revName}>{rev.name}</Text>
                  <Text style={styles.revDate}>{rev.date}</Text>
                </View>
                <View style={styles.revStars}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" size={12} color={colors.star} />
                  ))}
                </View>
              </View>

              {rev.title ? <Text style={styles.revTitle}>{rev.title}</Text> : null}
              <Text style={styles.revComment}>{rev.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Write a Review Modal matching artboard 19 */}
      <Modal visible={writeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Write A Review</Text>
            <Text style={styles.tapText}>Tap a star to rate</Text>

            <View style={styles.interactiveStars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setRating(s)}>
                  <Ionicons
                    name={s <= rating ? 'star' : 'star-outline'}
                    size={32}
                    color={colors.star}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Review Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Excellent service and delicious food"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.inputLabel}>Review Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell others about your experience, staff behavior, room cleanliness, food quality..."
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />

            <CustomButton
              title="Submit Review"
              onPress={handlePostReview}
              style={{ marginTop: spacing.md }}
            />
            <TouchableOpacity style={styles.modalCancel} onPress={() => setWriteModal(false)}>
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
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  scoreVal: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
  },
  scoreSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  ratingsCount: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  writeReviewBtn: {
    width: '100%',
  },
  reviewsList: {
    gap: spacing.sm,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  revHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  revAvatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    marginRight: spacing.sm,
    backgroundColor: colors.borderLight,
  },
  revUserCol: {
    flex: 1,
  },
  revName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  revDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  revStars: {
    flexDirection: 'row',
    gap: 2,
  },
  revTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  revComment: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  tapText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  interactiveStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: spacing.xs,
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
  textArea: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  modalCancel: {
    marginTop: spacing.sm,
    alignItems: 'center',
    padding: 10,
  },
  modalCancelText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
});
