import { Router } from "express";
import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} from "./listing.controller";

const ListingRoutes = Router();

// GET /api/listings/getAllListings - Get all listings
ListingRoutes.get("/getAllListings", getAllListings);

// GET /api/listings/getListingById/:id - Get listing by ID
ListingRoutes.get("/getListingById/:id", getListingById);

// POST /api/listings/createListing - Create new listing
ListingRoutes.post("/createListing", createListing);

// PUT /api/listings/updateListing/:id - Update listing
ListingRoutes.put("/updateListing/:id", updateListing);

// DELETE /api/listings/deleteListing/:id - Delete listing
ListingRoutes.delete("/deleteListing/:id", deleteListing);

export default ListingRoutes;
