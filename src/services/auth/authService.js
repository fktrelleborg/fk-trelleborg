import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirebaseApp } from '../firebase/firebase'; // Ensure you have firebase initialized in a separate file

// Custom hook to track authentication status
export default function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Holds authentication status

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());
    
    // Firebase listener to track auth status changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { isAuthenticated };
}

