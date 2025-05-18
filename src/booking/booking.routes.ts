import { Router } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from "./booking.controller";

const BookingRoutes = Router();

// GET /api/bookings/getAllBookings - Get all bookings
BookingRoutes.get("/getAllBookings", getAllBookings);

// GET /api/bookings/getBookingById - Get booking by ID
BookingRoutes.get("/getBookingById/:id", getBookingById);

// POST /api/bookings/createBooking - Create new booking
BookingRoutes.post("/createBooking", createBooking);

// PATCH /api/booking/updateBookingStatus/:id/status - Update booking status
BookingRoutes.patch("/updateBookingStatus/:id", updateBookingStatus);

// DELETE /api/bookings/deleteBooking/:id - Delete booking
BookingRoutes.delete("/deleteBooking/:id", deleteBooking);

export default BookingRoutes;
