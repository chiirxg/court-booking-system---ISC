// ─────────────────────────────────────────────────────
// Select — a styled native HTML dropdown
//
// Usage:
//   <Select value={val} onChange={e => setVal(e.target.value)}>
//     <option value="">-- Choose --</option>
//     <option value="foo">Foo</option>
//   </Select>
// ─────────────────────────────────────────────────────

function Select({ id, value, onChange, children, className = '', required = false }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}   // called whenever the user picks a different option
      required={required}
      className={
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ' +
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ' +
        'disabled:cursor-not-allowed disabled:opacity-50 ' +
        className
      }
    >
      {children}
    </select>
  )
}

export default Select
