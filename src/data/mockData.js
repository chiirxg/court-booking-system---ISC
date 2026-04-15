// ─────────────────────────────────────────────
// mockData.js — static data that never changes
//
// Courts and time slots are defined here because
// they are fixed options, not user-generated data.
//
// NOTE: initialBookings was removed — bookings now
// come from Firebase Firestore (the cloud database)
// and are managed in BookingContext.jsx.
// ─────────────────────────────────────────────

// The 3 sports courts available for booking
export const courts = [
  { id: 1, name: 'Badminton Court', icon: '🏸' },
  { id: 2, name: 'Squash Court',    icon: '🎾' },
  { id: 3, name: 'Tennis Court',    icon: '🎾' },
]

// The time slots shown for each court each day
export const timeSlots = [
  '8:00 AM',
  '10:00 AM',
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
]
