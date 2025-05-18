import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "./location.controller";

const LocationRoutes = Router();

// GET /api/locations/getAllLocations - Get all locations
LocationRoutes.get("/getAllLocations", getAllLocations);

// GET /api/locations/getLocationById/:id - Get location by ID
LocationRoutes.get("/getLocationById/:id", getLocationById);

// POST /api/locations/createLocation - Create new location
LocationRoutes.post("/createLocation", createLocation);

// PUT /api/locations/updateLocation/:id - Update location
LocationRoutes.put("/updateLocation/:id", updateLocation);

// DELETE /api/locations/deleteLocation/:id - Delete location
LocationRoutes.delete("/deleteLocation/:id", deleteLocation);

export default LocationRoutes;
