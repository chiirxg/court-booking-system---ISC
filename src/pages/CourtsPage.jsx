import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { courts, timeSlots } from '../data/mockData'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// ─────────────────────────────────────────────────────
// CourtsPage — the Home page
// Shows all 3 courts with today's time slots and their status
// ─────────────────────────────────────────────────────

function CourtsPage() {
  const { bookings } = useBooking()  // pull all bookings from global state
  const navigate = useNavigate()     // used to redirect to another page

  // Today's date in YYYY-MM-DD format (to match booking dates)
  const today = new Date().toISOString().split('T')[0]

  // ── Determine the status of a specific slot ──────────
  // Returns "available", "pending", or "booked"
  function getSlotStatus(courtName, timeSlot) {
    // Search all bookings for one that matches this court + slot + today
    const match = bookings.find(
      b => b.court === courtName && b.timeSlot === timeSlot && b.date === today
    )
    if (!match) return 'available'              // no booking found → free
    if (match.status === 'Approved') return 'booked'
    if (match.status === 'Pending')  return 'pending'
    return 'available'  // Rejected bookings free the slot back up
  }

  // ── Navigate to the booking form, pre-filling court & slot ──
  function handleBook(courtName, timeSlot) {
    // encodeURIComponent makes the text safe to include in a URL
    navigate(`/book?court=${encodeURIComponent(courtName)}&slot=${encodeURIComponent(timeSlot)}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* ── Page heading ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Courts</h1>
        <p className="text-gray-500 mt-1">
          Showing today's slots — {today}
        </p>
      </div>

      {/* ── Grid of court cards ──
           1 column on phones, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courts.map(court => (
          <Card key={court.id}>
            <CardHeader>
              {/* Court name with emoji icon */}
              <CardTitle>
                <span className="mr-2">{court.icon}</span>
                {court.name}
              </CardTitle>
              <p className="text-sm text-gray-400 mt-1">Today's time slots</p>
            </CardHeader>

            <CardContent>
              {/* List of time slots for this court */}
              <div className="space-y-2">
                {timeSlots.map(slot => {
                  const status = getSlotStatus(court.name, slot)

                  return (
                    <div
                      key={slot}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      {/* Time label */}
                      <span className="text-sm font-medium text-gray-700">{slot}</span>

                      <div className="flex items-center gap-2">
                        {/* Coloured status badge */}
                        <Badge variant={status}>
                          {status === 'available' ? 'Available'
                           : status === 'pending'   ? 'Pending'
                           : 'Booked'}
                        </Badge>

                        {/* Book button — only shown for available slots */}
                        {status === 'available' && (
                          <Button size="sm" onClick={() => handleBook(court.name, slot)}>
                            Book
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CourtsPage
