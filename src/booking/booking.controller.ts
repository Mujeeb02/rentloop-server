import { Request, Response } from "express";
import prisma from "../db/db.config";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        listing: true,
        renter: true,
      },
    });
    return res.status(200).json(successResponse("Bookings retrieved successfully", bookings));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        listing: true,
        renter: true,
        review: true,
        messages: true,
      },
    });

    if (!booking) {
      return res.status(404).json(errorResponse("Booking not found"));
    }

    return res.status(200).json(successResponse("Booking retrieved successfully", booking));
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      startDate,
      endDate,
      totalPrice,
      listingId,
      renterId,
    } = req.body;

    const booking = await prisma.booking.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        listingId,
        renterId,
      },
      include: {
        listing: true,
        renter: true,
      },
    });

    return res.status(201).json(successResponse("Booking created successfully", booking));
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(successResponse("Booking status updated successfully", booking));
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete related messages first
    await prisma.message.deleteMany({
      where: { bookingId: id },
    });

    // Delete related review if exists
    await prisma.review.deleteMany({
      where: { bookingId: id },
    });

    // Delete the booking
    await prisma.booking.delete({
      where: { id },
    });

    return res.status(200).json(successResponse("Booking deleted successfully", null));
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

























































