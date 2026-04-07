import { useBooking } from '../context/BookingContext'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// ─────────────────────────────────────────────────────
// AdminDashboard — /admin route
// Shows ALL bookings; admin can Approve or Reject pending ones
// ─────────────────────────────────────────────────────

function AdminDashboard() {
  // Get bookings and the function that changes a booking's status
  const { bookings, updateBookingStatus } = useBooking()

  // Count bookings in each status for the summary row
  const pendingCount  = bookings.filter(b => b.status === 'Pending').length
  const approvedCount = bookings.filter(b => b.status === 'Approved').length
  const rejectedCount = bookings.filter(b => b.status === 'Rejected').length

  // Map status string → Badge variant
  function statusVariant(status) {
    if (status === 'Approved') return 'approved'
    if (status === 'Rejected') return 'rejected'
    return 'pending'
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* ── Page heading ── */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Review and manage all court booking requests</p>
      </div>

      {/* ── Summary cards (Pending / Approved / Rejected counts) ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Pending"  count={pendingCount}  color="text-yellow-600" bg="bg-yellow-50 border border-yellow-200" />
        <SummaryCard label="Approved" count={approvedCount} color="text-green-600"  bg="bg-green-50  border border-green-200" />
        <SummaryCard label="Rejected" count={rejectedCount} color="text-red-600"    bg="bg-red-50    border border-red-200" />
      </div>

      {/* ── Full bookings table ── */}
      <Card>
        <CardHeader>
          <CardTitle>All Booking Requests ({bookings.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Empty state */}
          {bookings.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📭</div>
              <p>No booking requests yet.</p>
            </div>
          ) : (
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
                    <th className="py-3 px-2 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map(booking => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Student info */}
                      <td className="py-3 px-2">
                        <div className="font-medium text-gray-900">{booking.studentName}</div>
                        <div className="text-xs text-gray-400">{booking.rollNumber}</div>
                      </td>
                      <td className="py-3 px-2 text-gray-700">{booking.court}</td>
                      <td className="py-3 px-2 text-gray-700">{booking.date}</td>
                      <td className="py-3 px-2 text-gray-700">{booking.timeSlot}</td>

                      {/* Status badge */}
                      <td className="py-3 px-2">
                        <Badge variant={statusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>

                      {/* ── Action buttons ─────────────────────────────
                           Only show Approve / Reject for Pending bookings.
                           Once decided, show a dash (no double-approving). */}
                      <td className="py-3 px-2">
                        {booking.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'Approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateBookingStatus(booking.id, 'Rejected')}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
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

// ─────────────────────────────────────────────────────
// SummaryCard — small stat box shown at the top of the dashboard
// ─────────────────────────────────────────────────────
function SummaryCard({ label, count, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-5 text-center`}>
      <div className={`text-4xl font-bold ${color}`}>{count}</div>
      <div className="text-sm text-gray-600 mt-1 font-medium">{label}</div>
    </div>
  )
}

export default AdminDashboard
