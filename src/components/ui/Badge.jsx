// ─────────────────────────────────────────────────────
// Badge — a small coloured pill label used to show status
//
// Props:
//   variant → "available" | "pending" | "booked" | "approved" | "rejected"
// ─────────────────────────────────────────────────────

function Badge({ children, variant = 'default' }) {
  // Map each variant name to Tailwind colour classes
  const variants = {
    default:   'bg-gray-100   text-gray-700',
    available: 'bg-green-100  text-green-700',
    pending:   'bg-yellow-100 text-yellow-700',
    booked:    'bg-red-100    text-red-700',
    approved:  'bg-green-100  text-green-700',
    rejected:  'bg-red-100    text-red-700',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  )
}

export default Badge
