import { Link, useLocation } from 'react-router-dom'

// ─────────────────────────────────────────────────────
// Navbar — sticky top bar with the app logo and page links
// ─────────────────────────────────────────────────────

function Navbar() {
  // useLocation tells us the current URL path (e.g. "/my-bookings")
  const location = useLocation()

  // Returns true if the given path matches the current URL
  function isActive(path) {
    return location.pathname === path
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo / Brand name ── */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🏟️</span>
            <span className="font-bold text-gray-900 text-lg">SportBook</span>
          </Link>

          {/* ── Navigation links ── */}
          <div className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/"            active={isActive('/')}>Courts</NavLink>
            <NavLink to="/my-bookings" active={isActive('/my-bookings')}>My Bookings</NavLink>
            <NavLink to="/admin"       active={isActive('/admin')}>Admin</NavLink>
          </div>

        </div>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────
// NavLink — a single navigation item
// Highlights itself when it's the current page (active=true)
// ─────────────────────────────────────────────────────
function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'bg-green-100 text-green-700'                       // current page style
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' // default style
      }`}
    >
      {children}
    </Link>
  )
}

export default Navbar
