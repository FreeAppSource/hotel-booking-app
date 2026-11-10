import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../theme';
import { HotelBookingProvider } from '../data';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <HotelBookingProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="top-hotels" options={{ headerShown: false }} />
          <Stack.Screen name="hotel-detail" options={{ headerShown: false }} />
          <Stack.Screen name="booking" options={{ headerShown: false }} />
          <Stack.Screen name="checkout" options={{ headerShown: false }} />
          <Stack.Screen name="booking-confirmation" options={{ headerShown: false }} />
          <Stack.Screen name="reviews" options={{ headerShown: false }} />
          <Stack.Screen name="past-bookings" options={{ headerShown: false }} />
        </Stack>
      </HotelBookingProvider>
    </ThemeProvider>
  );
}
