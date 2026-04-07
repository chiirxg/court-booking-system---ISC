// ─────────────────────────────────────────────
// Mock / dummy data — in a real app this would
// come from a database or API
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

// A few pre-filled bookings so the app doesn't start completely empty
// Status can be: "Pending" | "Approved" | "Rejected"
export const initialBookings = [
  {
    id: 1,
    studentName: 'Rahul Sharma',
    rollNumber:  'IIT2021001',
    court:       'Badminton Court',
    date:        '2026-04-06',
    timeSlot:    '8:00 AM',
    status:      'Approved',
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    rollNumber:  'IIT2021002',
    court:       'Tennis Court',
    date:        '2026-04-06',
    timeSlot:    '10:00 AM',
    status:      'Pending',
  },
  {
    id: 3,
    studentName: 'Amit Kumar',
    rollNumber:  'IIT2021003',
    court:       'Squash Court',
    date:        '2026-04-06',
    timeSlot:    '2:00 PM',
    status:      'Rejected',
  },
]
