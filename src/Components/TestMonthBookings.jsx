import { useState, useEffect } from "react";
import { getBookingsByMonth } from "../services/bookingService";

const TestMonthBookings = () => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthBookings = async () => {
      try {
        setLoading(true);
        // Get current month's bookings
        const currentDate = new Date();
        const monthBookings = await getBookingsByMonth(currentDate.getFullYear(), currentDate.getMonth());

        setBookings(monthBookings);
        console.log("Current month bookings:", monthBookings);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching month bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthBookings();
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Current Month Bookings</h2>
      {bookings && bookings.length > 0 ? (
        <div>
          {bookings.map((booking) => (
            <div key={booking.date} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
              <h3>Date: {booking.date}</h3>
              {Object.entries(booking)
                .filter(([key]) => key !== "date")
                .map(([status, users]) => (
                  <div key={status}>
                    <strong>{status}:</strong> {users && users.length > 0 ? users.join(", ") : "No users"}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found for this month</p>
      )}
    </div>
  );
};

export default TestMonthBookings;
