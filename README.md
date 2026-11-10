# Hotel Booking Mobile App

A hotel booking mobile application built with **pure JavaScript & JSX** (`.js` / `.jsx`), Expo SDK 58+, and Expo Router, based on the 20 Sketch artboards designed by Ami Moradia.

---

## 📱 Features & Screens

### 1. Onboarding & Member Authentication
- **3-Step Onboarding Flow**:
  1. *Browse best hotels from 40,000+ database that fits your unique needs*
  2. *Find the best deals from any season and book from a curated list*
  3. *Select the hotel and date as per your preference to book and have a pleasant stay*
- **Auth Flow (`/auth`)**:
  - Register with full name ("Kiran"), email, password, and Terms & Privacy agreement.
  - Login with remember state, password recovery, and instant login transitions.

### 2. Search & Hotel Exploration (`/(tabs)/index`)
- **Interactive Search Widget**:
  - City selection modal (Bangalore, Mumbai, Goa, Delhi, Dubai).
  - Check-in & Check-out date range picker.
  - Guest counter stepper (Adults 12+ yrs, Children 2-11 yrs, Infants under 2 yrs).
  - Room package picker (Single Deluxe, Double Bed + Free Breakfast, Premium Suite, Extra Bed).
- **Home Dashboard**:
  - Featured Luxury Stay carousel (Sheraton Grand, Taj Vista).
  - Top Hotels section with "View All" shortcut.
  - Seamless toggle between default discovery and search result catalog.

### 3. Top Hotels Catalog (`/top-hotels`)
- City filter chips (All, Bangalore, Whitefield, Indiranagar, Marathahalli).
- Sort & Filter modal: Price (Low to High, High to Low), Star rating (5★, 4★, 3★), Recommended match %.
- Itemized hotel cards with percentage match badge, photos, location, and quick "Book Now" CTA.

### 4. Hotel Details (`/hotel-detail?id=...`)
- High-resolution hero image gallery.
- Name, percentage score, location with map preview.
- Direct contact links: One-tap phone calling and email inquiry.
- Amenities grid: Free WiFi, Breakfast, Pets Allowed, Bar, Pool, Gym, Spa, Parking.
- Detailed hotel description with expandable text.
- Customer rating banner with 4.5 ★ rating from 25 reviews.
- Sticky bottom purchase bar with per-night price and "Book Now" button.

### 5. Multi-Step Booking & Checkout (`/booking` & `/checkout`)
- **Booking Details Sheet**: Primary guest name ("Pritam Prakash"), contact phone, stay dates, guest counts, room type selection.
- **Price Breakdown**: Room charge, GST & service taxes, total amount.
- **Payment Checkout Screen**:
  - Amount to be paid: ₹6,999.00
  - Payment options: Google Pay, Paytm, VISA, MasterCard.
  - One-tap "Pay & Confirm" action.
- **Booking Confirmation Screen (`/booking-confirmation`)**:
  - Congratulations banner.
  - Ticket details receipt card: Booking ID (`#HTL-891240`), dates, guest name, total paid.
  - "Go back to Home" and "View in Past Bookings" CTAs.

### 6. Reviews & Rating (`/reviews`)
- Overall score breakdown: 4.5 ★ out of 5 from 25 ratings.
- Real guest reviews list (Kara James, Betty, Ben Smith, David).
- **Write a Review Modal**: Interactive star rating selector (1-5 stars), review title, and detailed feedback textarea.

### 7. Wishlist & User Profile (`/(tabs)/wishlist` & `/(tabs)/profile`)
- **Wishlist**: Saved hotels grid with one-tap booking and unsave toggle.
- **Profile**: Avatar ("Kiran"), Platinum Member badge, Past Bookings shortcut, My Account, Payments & Refunds, Support, and Logout.
- **Past Bookings Screen (`/past-bookings`)**: Active and completed reservations with invoice download simulation.

---

## 🎨 Design System
- **Primary Color**: `#EF4339` (Coral Red)
- **Secondary Color**: `#283593` (Royal Indigo)
- **Background**: `#F8FAFC`
- **Card**: `#FFFFFF`
- **Star Rating**: `#FFB800`

---

## 🚀 Running the App

```bash
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Hotel Booking App Concept** design by **Ami Moradia**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Ami Moradia](https://www.sketchappsources.com/contributor/amimoradia) |
| Original design | [Hotel Booking App Concept](https://www.behance.net/gallery/106897675/Hotel-Booking-Application-UX-Case-Study) |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4625-hotel-booking-app-sketch-freebie-resoruce.html) |
| Dribbble | <http://www.dribbble.com/amimoradia> |
| Original file | `hotel-booking-app-amimoradia.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Hotel Booking App Concept" by Ami Moradia (https://www.behance.net/gallery/106897675/Hotel-Booking-Application-UX-Case-Study), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4625-hotel-booking-app-sketch-freebie-resoruce.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
