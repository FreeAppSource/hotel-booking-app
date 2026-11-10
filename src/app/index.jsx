import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { onboardingSlides } from '../data';
import { CustomButton } from '../components/CustomButton';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const slide = onboardingSlides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.graphicBox}>
          <View style={styles.circle}>
            <Ionicons name={slide.icon} size={64} color={colors.primary} />
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>{slide.badge}</Text>
          </View>
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {onboardingSlides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <CustomButton
          title={currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.ctaBtn}
        />

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/auth')}
        >
          <Text style={styles.loginLinkText}>
            Already a member? <Text style={styles.loginLinkBold}>Login here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  skipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  graphicBox: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  badgePill: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgePillText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border,
  },
  ctaBtn: {
    width: '100%',
  },
  loginLink: {
    marginTop: spacing.md,
    padding: 6,
  },
  loginLinkText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  loginLinkBold: {
    color: colors.primary,
    fontWeight: '700',
  },
});
