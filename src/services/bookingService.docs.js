/**
 * Booking Service Documentation
 *
 * This service handles all booking-related operations for employee status tracking.
 * Each booking represents the working status of employees for a specific date.
 *
 * Status Options:
 * - AT_OFFICE: Employee is working at the office
 * - AT_HOME: Employee is working from home
 * - VACATION: Employee is on vacation
 * - SICK: Employee is sick
 * - VAB: Employee is on parental leave
 * - KARLSKRONA: Employee is working from Karlskrona office
 * - SUNDSVALL: Employee is working from Sundsvall office
 */

/**
 * Creates or updates a booking for a specific date and user
 *
 * @param {string} userId - The ID of the user making the booking
 * @param {string} status - The status to set (must be one of BookingStatus values)
 * @param {string} date - The date in 'YYYY-MM-DD' format
 * @returns {Promise<Object>} The created/updated booking
 * @throws {Error} If status is invalid or if there's a database error
 *
 * @example
 * // Create a booking for working from home
 * await createBooking('user123', BookingStatus.AT_HOME, '2024-04-01');
 */
// createBooking(userId, status, date)

/**
 * Gets all bookings for a specific month
 *
 * @param {number} year - The year (e.g., 2024)
 * @param {number} month - The month (0-11, where 0 is January)
 * @returns {Promise<Array>} Array of bookings for the month, sorted by date
 *
 * @example
 * // Get all bookings for April 2024
 * const aprilBookings = await getBookingsByMonth(2024, 3);
 *
 * // Get current month's bookings
 * const now = new Date();
 * const currentMonthBookings = await getBookingsByMonth(now.getFullYear(), now.getMonth());
 */
// getBookingsByMonth(year, month)

/**
 * Gets all bookings for a specific user
 *
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} Array of bookings for the user
 *
 * @example
 * // Get all bookings for a specific user
 * const userBookings = await getUserBookings('user123');
 */
// getUserBookings(userId)

/**
 * Updates a user's booking status for a specific date
 *
 * @param {string} date - The date in 'YYYY-MM-DD' format
 * @param {string} userId - The ID of the user
 * @param {string} newStatus - The new status to set (must be one of BookingStatus values)
 * @returns {Promise<void>}
 * @throws {Error} If the booking doesn't exist or if status is invalid
 *
 * @example
 * // Update a user's status to working from home
 * await updateBooking('2024-04-01', 'user123', BookingStatus.AT_HOME);
 */
// updateBooking(date, userId, newStatus)

/**
 * Gets all bookings for a specific date
 *
 * @param {string} date - The date in 'YYYY-MM-DD' format
 * @returns {Promise<Object|null>} The booking for the date, or null if none exists
 *
 * @example
 * // Get bookings for a specific date
 * const dateBookings = await getBookingsByDate('2024-04-01');
 */
// getBookingsByDate(date)

/**
 * Data Structure Example:
 *
 * A booking document in Firebase looks like this:
 * {
 *   date: "2024-04-01",
 *   at_office: ["user1", "user2"],
 *   at_home: ["user3"],
 *   vacation: ["user4"],
 *   sick: ["user5"],
 *   vab: [],
 *   karlskrona: ["user6"],
 *   sundsvall: []
 * }
 *
 * Each status field contains an array of user IDs who have that status for the date.
 * A user can only have one status per date.
 */
