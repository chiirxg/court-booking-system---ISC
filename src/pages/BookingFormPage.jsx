import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { courts, timeSlots } from '../data/mockData'
import { Card, CardContent } from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'

// ─────────────────────────────────────────────────────
// BookingFormPage — form to request a court booking
// If the user clicked "Book" on the Courts page, the court
// and time slot are pre-filled via URL query parameters.
//
// What changed from the old version:
//   • addBooking is now async (it talks to Firestore)
//   • We handle the { success, error } return value
//   • A "saving" state disables the button while Firestore saves
//   • An inline error message is shown if the slot is already taken
// ─────────────────────────────────────────────────────

function BookingFormPage() {
  // Read URL query parameters — e.g. /book?court=Badminton%20Court&slot=8%3A00%20AM
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addBooking } = useBooking()  // async function to save a new booking

  // Pre-fill form if user came from the Courts page
  const prefillCourt = searchParams.get('court') || ''
  const prefillSlot  = searchParams.get('slot')  || ''

  // ── One state variable per form field ──────────────
  const [studentName, setStudentName] = useState('')
  const [rollNumber,  setRollNumber]  = useState('')
  const [court,       setCourt]       = useState(prefillCourt)
  const [date,        setDate]        = useState('')
  const [timeSlot,    setTimeSlot]    = useState(prefillSlot)

  // submitted — true after a SUCCESSFUL booking; shows the success screen
  const [submitted, setSubmitted] = useState(false)

  // saving — true while we are waiting for Firestore to save the booking
  // We disable the Submit button during this time to prevent double-clicks
  const [saving, setSaving] = useState(false)

  // slotError — holds an error message if the chosen slot is already booked
  // Empty string means no error
  const [slotError, setSlotError] = useState('')

  // ── Handle form submission ──────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()    // stop the browser from refreshing the page
    setSlotError('')      // clear any previous error message
    setSaving(true)       // disable the Submit button immediately

    // Call addBooking — it now returns { success: true } or
    // { success: false, error: "This slot is already booked." }
    const result = await addBooking({ studentName, rollNumber, court, date, timeSlot })

    setSaving(false)  // re-enable the button no matter what happened

    if (result.success) {
      // Booking saved successfully
      setSubmitted(true)
      // After 2 seconds, redirect to My Bookings page
      setTimeout(() => navigate('/my-bookings'), 2000)
    } else {
      // Something went wrong — show the error message below the form
      setSlotError(result.error)
    }
  }

  // ── Success screen — shown after a successful submit ────────
  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900">Booking Submitted!</h2>
        <p className="text-gray-500 mt-2">Your request is pending admin approval.</p>
        <p className="text-gray-400 text-sm mt-1">Redirecting to My Bookings…</p>
      </div>
    )
  }

  // ── Main form ───────────────────────────────────────
  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Book a Court</h1>
        <p className="text-gray-500 mt-1">Fill in the details to request a slot</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* onSubmit fires handleSubmit when user clicks the Submit button */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ── Student Name ── */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}  // update state as you type
                required
              />
            </div>

            {/* ── Roll Number ── */}
            <div>
              <label htmlFor="roll" className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <Input
                id="roll"
                placeholder="e.g. IIT2021001"
                value={rollNumber}
                onChange={e => setRollNumber(e.target.value)}
                required
              />
            </div>

            {/* ── Court dropdown ── */}
            <div>
              <label htmlFor="court" className="block text-sm font-medium text-gray-700 mb-1">
                Court
              </label>
              <Select
                id="court"
                value={court}
                onChange={e => setCourt(e.target.value)}
                required
              >
                <option value="">-- Select a court --</option>
                {courts.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </Select>
            </div>

            {/* ── Date picker ── */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>

            {/* ── Time slot dropdown ── */}
            <div>
              <label htmlFor="slot" className="block text-sm font-medium text-gray-700 mb-1">
                Time Slot
              </label>
              <Select
                id="slot"
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                required
              >
                <option value="">-- Select a time slot --</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </Select>
            </div>

            {/* ── Slot-already-booked error message ────────────────────────
                 Only visible when slotError is not an empty string.
                 The red box appears right above the buttons so it's hard to miss. */}
            {slotError && (
              <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm">
                {/* ⚠️ icon followed by the error text */}
                ⚠️ {slotError}
              </div>
            )}

            {/* ── Buttons ── */}
            <div className="flex gap-3 pt-2">
              {/* type="submit" triggers the form's onSubmit handler.
                  disabled={saving} greys out the button while Firestore is saving,
                  which prevents the user from clicking Submit twice. */}
              <Button type="submit" className="flex-1" disabled={saving}>
                {/* Show different text depending on whether we are saving */}
                {saving ? 'Saving…' : 'Submit Booking'}
              </Button>
              {/* navigate(-1) goes back to the previous page */}
              <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={saving}>
                Cancel
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingFormPage
