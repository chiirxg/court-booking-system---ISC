import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Navbar from './components/Navbar'
import CourtsPage from './pages/CourtsPage'
import BookingFormPage from './pages/BookingFormPage'
import MyBookingsPage from './pages/MyBookingsPage'
import AdminDashboard from './pages/AdminDashboard'

// App is the root component — it wraps everything together
function App() {
  return (
    // BookingProvider gives every page access to the shared bookings data
    <BookingProvider>
      {/* BrowserRouter enables page navigation without full page reloads */}
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {/* Navbar appears on every page */}
          <Navbar />

          {/* Routes decide which page component to show based on the URL */}
          <Routes>
            <Route path="/"            element={<CourtsPage />} />
            <Route path="/book"        element={<BookingFormPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/admin"       element={<AdminDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BookingProvider>
  )
}

export default App
