import { useBooking } from '../context/BookingContext'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

// ─────────────────────────────────────────────────────
// MyBookingsPage — shows a table of all bookings
// In a real app you'd filter by the logged-in student;
// here we show all bookings since there's no auth.
// ─────────────────────────────────────────────────────

function MyBookingsPage() {
  const { bookings } = useBooking()  // get the global bookings list

  // Map booking status string → Badge variant name
  function statusVariant(status) {
    if (status === 'Approved') return 'approved'
    if (status === 'Rejected') return 'rejected'
    return 'pending'  // default for "Pending"
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* ── Page heading ── */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-1">Track the status of your court requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({bookings.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {/* ── Empty state ── */}
          {bookings.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📋</div>
              <p>No bookings yet. Go to <strong>Courts</strong> to book a slot!</p>
            </div>
          ) : (
            /* ── Bookings table ──
                 overflow-x-auto lets it scroll sideways on small screens */
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                {/* Column headers */}
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="py-3 px-2 font-semibold text-gray-700">Student</th>
                    <th className="py-3 px-2 font-semibold text-gray-700">Court</th>
                    <th className="py-3 px-2 font-semibold text-gray-700">Date</th>
                    <th className="py-3 px-2 font-semibold text-gray-700">Time</th>
                    <th className="py-3 px-2 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>

                {/* One row per booking */}
                <tbody>
                  {bookings.map(booking => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Student name + roll number stacked */}
                      <td className="py-3 px-2">
                        <div className="font-medium text-gray-900">{booking.studentName}</div>
                        <div className="text-xs text-gray-400">{booking.rollNumber}</div>
                      </td>
                      <td className="py-3 px-2 text-gray-700">{booking.court}</td>
                      <td className="py-3 px-2 text-gray-700">{booking.date}</td>
                      <td className="py-3 px-2 text-gray-700">{booking.timeSlot}</td>
                      <td className="py-3 px-2">
                        {/* Coloured badge — green/yellow/red based on status */}
                        <Badge variant={statusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MyBookingsPage
