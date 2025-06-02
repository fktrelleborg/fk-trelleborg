import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { createBooking, getUserBookings, BookingStatus } from "../services/bookingService";

const TestBooking = () => {
  const { currentUser } = useContext(AuthContext);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createTestBooking = async () => {
      try {
        if (!currentUser) {
          setError("No user logged in");
          return;
        }

        // Create a new booking for 2025-06-03 with status AT_HOME
        const newBooking = await createBooking(currentUser.uid, BookingStatus.VAB, "2025-07-04");

        setBooking(newBooking);

        // Verify the booking was created by fetching user's bookings
        const userBookings = await getUserBookings(currentUser.uid);
        console.log("All user bookings:", userBookings);
      } catch (err) {
        setError(err.message);
        console.error("Error creating test booking:", err);
      }
    };

    createTestBooking();
  }, [currentUser]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Test Booking Result</h2>
      {booking ? (
        <div>
          <p>Booking created successfully!</p>
          <pre>{JSON.stringify(booking, null, 2)}</pre>
        </div>
      ) : (
        <p>Creating booking...</p>
      )}
    </div>
  );
};

export default TestBooking;
