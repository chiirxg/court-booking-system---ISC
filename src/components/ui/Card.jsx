// ─────────────────────────────────────────────────────
// Card family — white box with a subtle shadow/border
// Used to group related content visually
//
// Usage:
//   <Card>
//     <CardHeader>
//       <CardTitle>Title here</CardTitle>
//     </CardHeader>
//     <CardContent>
//       ... content ...
//     </CardContent>
//   </Card>
// ─────────────────────────────────────────────────────

// Outer container — white background, rounded corners, shadow
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

// Top section of the card — usually holds CardTitle
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-6 pb-3 ${className}`}>
      {children}
    </div>
  )
}

// Bold heading inside the header
export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  )
}

// Main body of the card
export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-6 pt-3 ${className}`}>
      {children}
    </div>
  )
}
