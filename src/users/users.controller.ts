import { Request, Response } from "express";
import prisma from "../db/db.config";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(successResponse("Users retrieved successfully", users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    
    if (!user) {
      return res.status(404).json(errorResponse("User not found"));
    }
    
    return res.status(200).json(successResponse("User retrieved successfully", user));
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, avatarUrl, bio, city, phone, role } = req.body;
    
    const user = await prisma.user.update({
      where: { id },
      data: { fullName, avatarUrl, bio, city, phone, role },
    });
    
    return res.status(200).json(successResponse("User updated successfully", user));
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.user.delete({ where: { id } });
    
    return res.status(200).json(successResponse("User deleted successfully", null));
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};