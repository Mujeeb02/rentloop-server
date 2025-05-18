import { Request, Response } from "express";
import prisma from "../db/db.config";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        category: true,
        location: true,
        images: true,
      },
    });
    return res.status(200).json(successResponse("Listings retrieved successfully", listings));
  } catch (error) {
    console.error("Error fetching listings:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        category: true,
        location: true,
        images: true,
        availability: true,
      },
    });

    if (!listing) {
      return res.status(404).json(errorResponse("Listing not found"));
    }

    return res.status(200).json(successResponse("Listing retrieved successfully", listing));
  } catch (error) {
    console.error("Error fetching listing:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const createListing = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      pricePerDay,
      ownerId,
      categoryId,
      locationId,
      images,
    } = req.body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        pricePerDay,
        ownerId,
        categoryId: parseInt(categoryId),
        locationId: parseInt(locationId),
        images: {
          create: images.map((url: string) => ({ imageUrl: url })),
        },
      },
      include: {
        images: true,
        category: true,
        location: true,
      },
    });

    return res.status(201).json(successResponse("Listing created successfully", listing));
  } catch (error) {
    console.error("Error creating listing:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      pricePerDay,
      isActive,
      categoryId,
      locationId,
    } = req.body;

    const listing = await prisma.listing.update({
      where: { id },
      data: {
        title,
        description,
        pricePerDay,
        isActive,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        locationId: locationId ? parseInt(locationId) : undefined,
      },
    });

    return res.status(200).json(successResponse("Listing updated successfully", listing));
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete related images first
    await prisma.listingImage.deleteMany({
      where: { listingId: id },
    });

    // Delete related availabilities
    await prisma.availability.deleteMany({
      where: { listingId: id },
    });

    // Delete the listing
    await prisma.listing.delete({
      where: { id },
    });

    return res.status(200).json(successResponse("Listing deleted successfully", null));
  } catch (error) {
    console.error("Error deleting listing:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

































































