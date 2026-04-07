import { createContext, useContext, useState } from 'react'
import { initialBookings } from '../data/mockData'

// ─────────────────────────────────────────────────────────────────
// Context = a "global storage box" that any component can read from
// or write to, without passing props through every layer.
// ─────────────────────────────────────────────────────────────────

// Step 1: Create the context (just an empty box for now)
const BookingContext = createContext()

// Step 2: Create a Provider component that fills the box with data
// and wraps the whole app so everyone can reach inside
export function BookingProvider({ children }) {
  // bookings holds the list of all bookings; setBookings updates it
  const [bookings, setBookings] = useState(initialBookings)

  // addBooking: called when a student submits the booking form
  function addBooking(formData) {
    const newBooking = {
      ...formData,          // spread all form fields (name, court, date, etc.)
      id: Date.now(),       // use current timestamp as a unique ID
      status: 'Pending',    // every new booking starts as Pending
    }
    // Add the new booking to the end of the existing list
    setBookings(prev => [...prev, newBooking])
  }

  // updateBookingStatus: called by admin to Approve or Reject a booking
  function updateBookingStatus(id, newStatus) {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id
          ? { ...booking, status: newStatus }  // update only this booking
          : booking                             // leave all others unchanged
      )
    )
  }

  // Step 3: Share the data and functions with all child components
  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  )
}

// Custom hook — shortcut so you just write useBooking() instead of
// useContext(BookingContext) every time
export function useBooking() {
  return useContext(BookingContext)
}
