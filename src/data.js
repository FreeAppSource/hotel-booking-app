import React, { createContext, useContext, useState, useMemo } from 'react';

export const appInfo = {
  title: 'Hotel Booking App',
  tagline: 'Search, Compare & Book 40,000+ Curated Hotels',
  primaryColor: '#EF4339',
  version: '2.1.0',
};

export const onboardingSlides = [
  {
    id: '1',
    title: 'Search and save your preference',
    subtitle: 'Browse best hotels from 40,000+ database that fits your unique needs and travel style.',
    badge: '40,000+ Hotels',
    icon: 'search-outline',
  },
  {
    id: '2',
    title: 'Find the best deals',
    subtitle: 'Find the best deals from any season and book from a curated list of verified luxury stays.',
    badge: 'Seasonal Discounts',
    icon: 'pricetag-outline',
  },
  {
    id: '3',
    title: 'Book and enjoy your stay',
    subtitle: 'Select the hotel and date as per your preference to book and have a pleasant stay with instant confirmation.',
    badge: 'Instant Confirmation',
    icon: 'bed-outline',
  },
];

export const initialHotels = [
  {
    id: 'h1',
    name: 'Sheraton Grand',
    city: 'Bangalore',
    area: 'Whitefield',
    address: 'Prestige Shantiniketan, Whitefield, Bengaluru',
    star: 5,
    matchScore: '96%',
    price: 6999,
    originalPrice: 8499,
    rating: 4.8,
    reviewsCount: 38,
    imageKey: 'hotel_sheraton.png',
    email: 'sheraton.blr@grand.com',
    phone: '+91-8042521000',
    description: 'Nestled in the tech corridor of Bengaluru, Sheraton Grand provides an upscale home base with luxury suites, multiple fine dining restaurants, and award-winning spa facilities.',
    amenities: ['Free WiFi', 'Breakfast', 'Pets', 'Bar', 'Pool', 'Gym', 'Spa', 'Parking'],
    featured: true,
  },
  {
    id: 'h2',
    name: 'Taj Vista',
    city: 'Bangalore',
    area: 'MG Road',
    address: '41/3 Mahatma Gandhi Road, Bengaluru',
    star: 5,
    matchScore: '94%',
    price: 5999,
    originalPrice: 6999,
    rating: 4.9,
    reviewsCount: 42,
    imageKey: 'hotel_taj_vista.png',
    email: 'tajvista.blr@tajhotels.com',
    phone: '+91-8066604444',
    description: 'Overlooking the vibrant skyline of central Bengaluru, Taj Vista combines colonial heritage charm with cutting-edge modern comfort and signature royal hospitality.',
    amenities: ['Free WiFi', 'Breakfast', 'Bar', 'Pool', 'Gym', 'Valet'],
    featured: true,
  },
  {
    id: 'h3',
    name: 'Park Plaza',
    city: 'Bangalore',
    area: 'Marathahalli',
    address: 'Marathahalli, Outer Ring Road, Bengaluru',
    star: 4,
    matchScore: '90%',
    price: 6999,
    originalPrice: 7999,
    rating: 4.5,
    reviewsCount: 25,
    imageKey: 'hotel_park_plaza.png',
    email: 'parkplaza@gmail.com',
    phone: '+91-8729838721',
    description: "Nestled in the heart of Bengaluru, the Park Plaza provides an upscale home base with easy access to Bengaluru's Central Business District. Our stylish hotel is conveniently located within a 5km radius of business and entertainment hot spots and approx. 40-minute drive from Kempegowda International Airport (BLR).",
    amenities: ['Free WiFi', 'Breakfast', 'Pets', 'Bar', 'Pool', 'Spa', 'Airport Shuttle'],
    featured: true,
  },
  {
    id: 'h4',
    name: 'Lotus Park',
    city: 'Bangalore',
    area: 'Indiranagar',
    address: '100ft Road, Defence Colony, Indiranagar',
    star: 4,
    matchScore: '92%',
    price: 2999,
    originalPrice: 3999,
    rating: 4.4,
    reviewsCount: 19,
    imageKey: 'hotel_lotus_park.png',
    email: 'contact@lotuspark.in',
    phone: '+91-8025287700',
    description: 'Boutique stay in the culinary capital of Indiranagar. Surrounded by upscale cafes, craft breweries, and trendy retail boulevards.',
    amenities: ['Free WiFi', 'Breakfast', 'Bar', 'Parking'],
    featured: false,
  },
  {
    id: 'h5',
    name: 'Goldfinch Hotel',
    city: 'Bangalore',
    area: 'Crescent Road',
    address: '32/3 Crescent Road, High Grounds, Bengaluru',
    star: 3,
    matchScore: '88%',
    price: 1999,
    originalPrice: 2499,
    rating: 4.2,
    reviewsCount: 16,
    imageKey: 'hotel_goldfinch.png',
    email: 'reservations@goldfinchhotels.com',
    phone: '+91-8041298888',
    description: 'Smart executive hotel close to Bangalore Golf Club and Cantonment station. Clean, comfortable rooms with complimentary breakfast.',
    amenities: ['Free WiFi', 'Breakfast', 'Restaurant', 'Gym'],
    featured: false,
  },
  {
    id: 'h6',
    name: 'Sarovar Portico',
    city: 'Bangalore',
    area: 'Outer Ring Rd',
    address: 'Survey No 83/2, Doddanekkundi, Marathahalli',
    star: 4,
    matchScore: '96%',
    price: 4999,
    originalPrice: 5999,
    rating: 4.6,
    reviewsCount: 31,
    imageKey: 'hotel_sarovar.png',
    email: 'sarovar.blr@sarovarhotels.com',
    phone: '+91-8067334455',
    description: 'Contemporary business hotel featuring spacious executive rooms, rooftop multi-cuisine lounge, and 24-hour fitness center.',
    amenities: ['Free WiFi', 'Breakfast', 'Pool', 'Gym', 'Bar'],
    featured: true,
  },
  {
    id: 'h7',
    name: 'Taj Westside',
    city: 'Bangalore',
    area: 'Race Course Rd',
    address: '23 Race Course Road, Bengaluru',
    star: 5,
    matchScore: '96%',
    price: 8999,
    originalPrice: 10499,
    rating: 4.9,
    reviewsCount: 54,
    imageKey: 'hotel_taj_westside.png',
    email: 'westside.blr@tajhotels.com',
    phone: '+91-8066605656',
    description: 'Sprawling over 20 acres of landscaped flora and tranquil fountains. An idyllic sanctuary in the bustling metropolis.',
    amenities: ['Free WiFi', 'Breakfast', 'Pets', 'Bar', 'Pool', 'Tennis', 'Spa'],
    featured: true,
  },
  {
    id: 'h8',
    name: 'Pride Hotel',
    city: 'Bangalore',
    area: 'Richmond Road',
    address: '93 Richmond Road, Bengaluru',
    star: 4,
    matchScore: '90%',
    price: 3999,
    originalPrice: 4899,
    rating: 4.3,
    reviewsCount: 22,
    imageKey: 'hotel_pride.png',
    email: 'info.blr@pridehotel.com',
    phone: '+91-8043484348',
    description: 'Centrally located on Richmond Road, close to Brigade Road and commercial avenues. Features banquet spaces and fine dining.',
    amenities: ['Free WiFi', 'Breakfast', 'Restaurant', 'Gym', 'Parking'],
    featured: false,
  },
];

export const initialReviews = [
  {
    id: 'r1',
    hotelId: 'h3',
    name: 'Kara James',
    date: 'Feb 2026',
    rating: 5,
    title: 'FAMILY FRIENDLY !!!',
    comment: 'Stayed for four nights, extremely friendly and cooperative staffs and lovely ambience, the best thing about this place is the quality of the food.',
    avatarKey: 'avatar_reviewer_1.png',
  },
  {
    id: 'r2',
    hotelId: 'h3',
    name: 'Betty',
    date: 'Jan 2026',
    rating: 5,
    title: 'Neat and Clean',
    comment: 'Courteous staff. Excellent food, south Indian as well as North Indian. Good location as per my requirements. Away from crowd.',
    avatarKey: 'avatar_reviewer_2.png',
  },
  {
    id: 'r3',
    hotelId: 'h3',
    name: 'Ben Smith',
    date: 'Jan 2026',
    rating: 4,
    title: 'Pleasant Stay',
    comment: 'Overall experience was good. only one thing would like to tell is there is no intercom in the room so bit difficult to call them.',
    avatarKey: 'avatar_reviewer_3.png',
  },
  {
    id: 'r4',
    hotelId: 'h3',
    name: 'David',
    date: 'Dec 2025',
    rating: 5,
    title: 'Senior Citizen Care',
    comment: 'They have amazing facilities for senior citizens. They took extra care of us with wheelchair access and personalized meals.',
    avatarKey: 'avatar_reviewer_4.png',
  },
];

export const initialBookings = [
  {
    id: 'HTL-891240',
    hotelId: 'h3',
    hotelName: 'Park Plaza',
    hotelCity: 'Bangalore',
    guestName: 'Pritam Prakash',
    contactNumber: '+91-8926581020',
    checkIn: '27 May, 2026',
    checkOut: '30 May, 2026',
    nights: 3,
    guests: '1 Adult',
    roomType: '1 Single Deluxe Room',
    amountPaid: 6999.00,
    paymentMethod: 'Google Pay',
    status: 'Confirmed',
    imageKey: 'hotel_park_plaza.png',
  },
  {
    id: 'HTL-774019',
    hotelId: 'h1',
    hotelName: 'Sheraton Grand',
    hotelCity: 'Bangalore',
    guestName: 'Kiran',
    contactNumber: '+91-8926581020',
    checkIn: '14 Feb, 2026',
    checkOut: '16 Feb, 2026',
    nights: 2,
    guests: '2 Adults',
    roomType: 'Double Bed + Free Breakfast',
    amountPaid: 13998.00,
    paymentMethod: 'MasterCard (**** 8821)',
    status: 'Completed',
    imageKey: 'hotel_sheraton.png',
  },
];

const HotelBookingContext = createContext(null);

export const HotelBookingProvider = ({ children }) => {
  const [hotels, setHotels] = useState(initialHotels);
  const [wishlist, setWishlist] = useState(['h1', 'h3', 'h7']);
  const [bookings, setBookings] = useState(initialBookings);
  const [reviews, setReviews] = useState(initialReviews);
  const [userProfile, setUserProfile] = useState({
    name: 'Kiran',
    email: 'kiran123@gmail.com',
    phone: '+91-8926581020',
    location: 'Bangalore, India',
    memberTier: 'Platinum Member',
  });

  // Current active search filter state
  const [searchParams, setSearchParams] = useState({
    city: 'Bangalore',
    checkIn: '27 May, 2026',
    checkOut: '30 May, 2026',
    adults: 1,
    children: 0,
    infants: 0,
    roomType: '1 Single Deluxe Room',
  });

  const toggleWishlist = (hotelId) => {
    setWishlist((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const isWishlisted = (hotelId) => wishlist.includes(hotelId);

  const addBooking = (bookingData) => {
    const newBooking = {
      id: 'HTL-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Confirmed',
      ...bookingData,
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const addReview = (reviewData) => {
    const newReview = {
      id: 'r_' + Date.now(),
      date: 'Just now',
      avatarKey: 'avatar_kiran.png',
      ...reviewData,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const updateProfile = (data) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const value = {
    hotels,
    wishlist,
    bookings,
    reviews,
    userProfile,
    searchParams,
    setSearchParams,
    toggleWishlist,
    isWishlisted,
    addBooking,
    addReview,
    updateProfile,
  };

  return (
    <HotelBookingContext.Provider value={value}>
      {children}
    </HotelBookingContext.Provider>
  );
};

export const useHotelBooking = () => {
  const context = useContext(HotelBookingContext);
  if (!context) {
    throw new Error('useHotelBooking must be used within a HotelBookingProvider');
  }
  return context;
};
