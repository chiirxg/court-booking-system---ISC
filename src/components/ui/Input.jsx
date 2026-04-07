// ─────────────────────────────────────────────────────
// Input — a styled text input field
//
// Props match standard HTML input attributes:
//   id, type, placeholder, value, onChange, required
// ─────────────────────────────────────────────────────

function Input({ id, type = 'text', placeholder, value, onChange, className = '', required = false }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}      // called every time the user types a character
      required={required}
      className={
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ' +
        'placeholder:text-gray-400 ' +
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ' +
        'disabled:cursor-not-allowed disabled:opacity-50 ' +
        className
      }
    />
  )
}

export default Input
