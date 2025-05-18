import { Request, Response } from "express";
import prisma from "../db/db.config";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await prisma.location.findMany();
    return res.status(200).json(successResponse("Locations retrieved successfully", locations));
  } catch (error) {
    console.error("Error fetching locations:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await prisma.location.findUnique({ 
      where: { id: parseInt(id) } 
    });
    
    if (!location) {
      return res.status(404).json(errorResponse("Location not found"));
    }
    
    return res.status(200).json(successResponse("Location retrieved successfully", location));
  } catch (error) {
    console.error("Error fetching location:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const createLocation = async (req: Request, res: Response) => {
  try {
    const { city, state, country } = req.body;
    
    const location = await prisma.location.create({
      data: { city, state, country },
    });
    
    return res.status(201).json(successResponse("Location created successfully", location));
  } catch (error) {
    console.error("Error creating location:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { city, state, country } = req.body;
    
    const location = await prisma.location.update({
      where: { id: parseInt(id) },
      data: { city, state, country },
    });
    
    return res.status(200).json(successResponse("Location updated successfully", location));
  } catch (error) {
    console.error("Error updating location:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.location.delete({ 
      where: { id: parseInt(id) } 
    });
    
    return res.status(200).json(successResponse("Location deleted successfully", null));
  } catch (error) {
    console.error("Error deleting location:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};