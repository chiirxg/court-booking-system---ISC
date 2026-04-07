// ─────────────────────────────────────────────────────
// Reusable Button component
//
// Props:
//   variant  → "default" (green) | "destructive" (red) | "outline" (border)
//   size     → "sm" | "md" | "lg"
//   disabled → true/false — greys out the button
//   type     → "button" | "submit" (for forms)
// ─────────────────────────────────────────────────────

function Button({
  children,          // the text/icon inside the button
  onClick,           // function to run when clicked
  variant = 'default',
  size = 'md',
  className = '',    // any extra Tailwind classes the caller wants to add
  disabled = false,
  type = 'button',
}) {
  // Styles shared by every button regardless of variant
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed'

  // Different colour schemes
  const variants = {
    default:     'bg-green-600 text-white hover:bg-green-700',
    destructive: 'bg-red-600   text-white hover:bg-red-700',
    outline:     'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary:   'bg-gray-200  text-gray-800 hover:bg-gray-300',
    ghost:       'text-gray-700 hover:bg-gray-100',
  }

  // Different height / padding sizes
  const sizes = {
    sm: 'h-8  px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
