// ─────────────────────────────────────────────────────────────────────────────
// BookingContext.jsx — global "storage box" for all booking data
//
// What changed from the old version:
//   • bookings are no longer stored in React memory (useState with mockData)
//   • they now live in Firebase Firestore, a real cloud database
//   • onSnapshot keeps the local bookings list in sync with the database
//     in real time — whenever any booking changes in the database, React
//     automatically re-renders every component that uses this context
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from 'react'

// ── Firebase imports ──────────────────────────────────────────────────────────
// db           — our Firestore database instance (created in firebase.js)
// collection   — points to a "folder" (collection) inside the database
// addDoc       — adds a new document (row) to a collection
// updateDoc    — updates one field inside an existing document
// doc          — points to a specific document by its ID
// onSnapshot   — listens for real-time changes; fires whenever data changes
// query        — lets us filter or sort a collection
// where        — a filter condition used inside query()
// getDocs      — fetches documents once (not real-time); used for duplicate check
// serverTimestamp — tells Firestore to use the server's current time
// ─────────────────────────────────────────────────────────────────────────────
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../firebase'

// ── Step 1: Create the context (empty box) ────────────────────────────────────
const BookingContext = createContext()

// ── Step 2: Provider component ───────────────────────────────────────────────
// Wraps the whole app; any component inside can read bookings or call functions
export function BookingProvider({ children }) {

  // bookings — the list of booking objects fetched from Firestore
  const [bookings, setBookings] = useState([])

  // loading — true while we are waiting for the FIRST reply from Firestore
  // Components can show a spinner while this is true
  const [loading, setLoading] = useState(true)

  // ── Real-time listener ────────────────────────────────────────────────────
  // useEffect runs once when the component first appears on screen.
  // onSnapshot sets up a "subscription": every time a document in the
  // "bookings" collection is added, changed, or deleted, the callback fires
  // and we update our local `bookings` state.
  useEffect(() => {
    // Get a reference to the "bookings" collection in Firestore
    const bookingsCollection = collection(db, 'bookings')

    // onSnapshot returns an "unsubscribe" function.
    // We call it in the cleanup (return) so the listener stops if this
    // component is ever removed from the screen (prevents memory leaks).
    const unsubscribe = onSnapshot(bookingsCollection, (snapshot) => {
      // snapshot.docs is an array of Firestore document objects.
      // We convert each one into a plain JS object that React can use.
      const bookingsList = snapshot.docs.map((document) => ({
        id: document.id,          // Firestore auto-generated document ID (string)
        ...document.data(),       // spread all other fields: studentName, court, etc.
      }))

      setBookings(bookingsList)   // update React state with the fresh list
      setLoading(false)           // first data arrived — no longer loading
    })

    // Cleanup: when the component unmounts, stop listening to Firestore
    return () => unsubscribe()
  }, []) // empty array = run this effect only once, on first render

  // ── addBooking ────────────────────────────────────────────────────────────
  // Called when a student submits the booking form.
  // Returns { success: true } or { success: false, error: "message" }
  async function addBooking(formData) {
    // ── Duplicate check ───────────────────────────────────────────────────
    // Build a query that looks for any existing booking that has the SAME
    // court, date, AND timeSlot as the one being submitted.
    const bookingsCollection = collection(db, 'bookings')

    const duplicateQuery = query(
      bookingsCollection,
      where('court',    '==', formData.court),     // same court
      where('date',     '==', formData.date),      // same date
      where('timeSlot', '==', formData.timeSlot),  // same time slot
    )

    // getDocs fetches matching documents once (we don't need real-time here)
    const duplicateSnapshot = await getDocs(duplicateQuery)

    // If any documents matched, that slot is already taken
    if (!duplicateSnapshot.empty) {
      return { success: false, error: 'This slot is already booked.' }
    }

    // ── Save the new booking ───────────────────────────────────────────────
    // addDoc adds a new document to the collection.
    // Firestore automatically generates a unique ID for the document.
    await addDoc(bookingsCollection, {
      studentName: formData.studentName,   // student's full name
      rollNumber:  formData.rollNumber,    // student's roll number
      court:       formData.court,         // court name (e.g. "Badminton Court")
      date:        formData.date,          // date string (e.g. "2026-04-15")
      timeSlot:    formData.timeSlot,      // time slot (e.g. "8:00 AM")
      status:      'Pending',              // every new booking starts as Pending
      createdAt:   serverTimestamp(),      // Firestore fills in the current time
    })

    return { success: true }
  }

  // ── updateBookingStatus ───────────────────────────────────────────────────
  // Called by admin to Approve or Reject a booking.
  // `id`        — the Firestore document ID of the booking (a string)
  // `newStatus` — "Approved" or "Rejected"
  async function updateBookingStatus(id, newStatus) {
    // doc() gives us a reference to the specific document with this ID
    const bookingRef = doc(db, 'bookings', id)

    // updateDoc only changes the fields you specify; everything else stays
    await updateDoc(bookingRef, { status: newStatus })
  }

  // ── Share data with the rest of the app ───────────────────────────────────
  // Any component that calls useBooking() gets:
  //   • bookings        — live list of all bookings
  //   • addBooking      — function to add a new booking
  //   • updateBookingStatus — function to approve/reject
  //   • loading         — true while waiting for first Firestore data
  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, loading }}>
      {children}
    </BookingContext.Provider>
  )
}

// Custom hook — shortcut so components write useBooking() instead of
// useContext(BookingContext) every time
export function useBooking() {
  return useContext(BookingContext)
}
