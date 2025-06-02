import {
  collection,
  query,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase/firebase";

// Enum for booking status
export const BookingStatus = {
  AT_OFFICE: "at_office",
  AT_HOME: "at_home",
  VACATION: "vacation",
  SICK: "sick",
  VAB: "vab",
  KARLSKRONA: "karlskrona",
  SUNDSVALL: "sundsvall",
};

// Helper function to validate status
const isValidStatus = (status) => {
  return Object.values(BookingStatus).includes(status);
};

// Helper function to get start and end dates for a month
const getMonthDates = (year, month) => {
  // month is 0-based in JavaScript Date
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // Last day of the month

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
};

// Get all bookings for a specific month
export const getBookingsByMonth = async (year, month) => {
  try {
    const { start, end } = getMonthDates(year, month);
    const q = query(collection(db, "bookings"));
    const querySnapshot = await getDocs(q);

    // Filter bookings that fall within the month
    const monthBookings = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        const bookingDate = doc.id; // The document ID is the date

        // Check if the booking date falls within the month
        if (bookingDate >= start && bookingDate <= end) {
          return {
            date: bookingDate,
            ...data,
          };
        }
        return null;
      })
      .filter((booking) => booking !== null)
      .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date

    return monthBookings;
  } catch (error) {
    console.error("Error getting bookings by month:", error);
    throw error;
  }
};

// Example usage:
// getBookingsByMonth(2024, 3) // Gets bookings for April 2024
// getBookingsByMonth(2024, 4) // Gets bookings for May 2024

// Create or update a booking for a specific date
export const createBooking = async (userId, status, date) => {
  try {
    if (!isValidStatus(status)) {
      throw new Error(`Invalid status: ${status}. Must be one of: ${Object.values(BookingStatus).join(", ")}`);
    }

    const bookingRef = doc(db, "bookings", date);
    const bookingDoc = await getDoc(bookingRef);

    const bookingData = {
      [status]: arrayUnion(userId), // Add user to the array for this status
    };

    if (!bookingDoc.exists()) {
      // If no booking exists for this date, create a new one
      // Initialize all status arrays as empty
      Object.values(BookingStatus).forEach((status) => {
        bookingData[status] = [];
      });
      bookingData[status] = [userId]; // Add the first user
      await setDoc(bookingRef, bookingData);
    } else {
      // If booking exists, update the status arrays
      const currentData = bookingDoc.data();

      // Remove user from all other status arrays
      Object.values(BookingStatus).forEach((currentStatus) => {
        if (currentStatus !== status && currentData[currentStatus]?.includes(userId)) {
          bookingData[currentStatus] = arrayRemove(userId);
        }
      });

      await updateDoc(bookingRef, bookingData);
    }

    return { id: date, ...bookingData };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Get bookings for a specific user
export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, "bookings"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        // Find which status the user has for this date
        const userStatus = Object.entries(BookingStatus).find(([, status]) => data[status]?.includes(userId))?.[1];

        if (userStatus) {
          return {
            id: doc.id,
            date: data.date,
            status: userStatus,
          };
        }
        return null;
      })
      .filter((booking) => booking !== null);
  } catch (error) {
    console.error("Error getting user bookings:", error);
    throw error;
  }
};

// Update a booking status for a user
export const updateBooking = async (date, userId, newStatus) => {
  try {
    if (!isValidStatus(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}. Must be one of: ${Object.values(BookingStatus).join(", ")}`);
    }

    const bookingRef = doc(db, "bookings", date);
    const bookingDoc = await getDoc(bookingRef);

    if (!bookingDoc.exists()) {
      throw new Error(`No booking exists for date: ${date}`);
    }

    const currentData = bookingDoc.data();
    const updates = {};

    // Find current status of the user
    const currentStatus = Object.values(BookingStatus).find((status) => currentData[status]?.includes(userId));

    // Remove user from current status array
    if (currentStatus) {
      updates[currentStatus] = arrayRemove(userId);
    }

    // Add user to new status array
    updates[newStatus] = arrayUnion(userId);

    await updateDoc(bookingRef, updates);
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Get all bookings for a specific date
export const getBookingsByDate = async (date) => {
  try {
    const bookingRef = doc(db, "bookings", date);
    const bookingDoc = await getDoc(bookingRef);

    if (!bookingDoc.exists()) {
      return null;
    }

    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    };
  } catch (error) {
    console.error("Error getting booking by date:", error);
    throw error;
  }
};

// Get all unique months (YYYY-MM) for which there are bookings, and include booking data for each month
export const getAllBookingMonths = async () => {
  try {
    const q = query(collection(db, "bookings"));
    const querySnapshot = await getDocs(q);

    // Group bookings by month
    const monthMap = {};

    querySnapshot.docs.forEach((doc) => {
      const bookingDate = doc.id; // format: YYYY-MM-DD
      const [year, month] = bookingDate.split('-');
      if (year && month) {
        const monthKey = `${year}-${month}`;
        if (!monthMap[monthKey]) {
          monthMap[monthKey] = [];
        }
        monthMap[monthKey].push({
          id: bookingDate,
          ...doc.data(),
        });
      }
    });

    // Return an array of { month: 'YYYY-MM', bookings: [...] }
    return Object.entries(monthMap)
      .map(([month, bookings]) => ({ month, bookings }))
      .sort((a, b) => a.month.localeCompare(b.month));
  } catch (error) {
    console.error("Error getting all booking months:", error);
    throw error;
  }
};
