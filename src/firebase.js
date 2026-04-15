// ─────────────────────────────────────────────────────────────────────────────
// firebase.js — sets up our connection to Firebase
//
// Firebase is Google's cloud platform.  We use two parts of it:
//   • Firebase App  — the main "connection" object (required first)
//   • Firestore     — the cloud database where bookings are stored
// ─────────────────────────────────────────────────────────────────────────────

// Import the function that creates the Firebase app
import { initializeApp } from 'firebase/app'

// Import the function that gives us access to the Firestore database
import { getFirestore } from 'firebase/firestore'

// ── Your Firebase project's unique settings ───────────────────────────────────
// These values come from the Firebase Console → Project Settings → Your apps.
// They identify WHICH Firebase project to connect to.
const firebaseConfig = {
  apiKey:            'AIzaSyAoZ9tTfMvhNzr2fBL2dg25w5t79oJI-tg',
  authDomain:        'isc-court-booking-system.firebaseapp.com',
  projectId:         'isc-court-booking-system',
  storageBucket:     'isc-court-booking-system.firebasestorage.app',
  messagingSenderId: '701679253976',
  appId:             '1:701679253976:web:7521c98e38afc981bfdaad',
}

// ── Initialise the Firebase app ───────────────────────────────────────────────
// Think of this like "logging in" to Firebase with your project's credentials.
// This must happen before we can use any Firebase service.
const app = initializeApp(firebaseConfig)

// ── Get a reference to the Firestore database ─────────────────────────────────
// `db` is the object we use everywhere else to read/write the database.
// We export it so any other file can import it with:
//   import { db } from '../firebase'
export const db = getFirestore(app)
