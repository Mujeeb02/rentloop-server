import { Request, Response } from "express";
import prisma from "../db/db.config";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(successResponse("Categories retrieved successfully", categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ 
      where: { id: parseInt(id) } 
    });
    
    if (!category) {
      return res.status(404).json(errorResponse("Category not found"));
    }
    
    return res.status(200).json(successResponse("Category retrieved successfully", category));
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    const category = await prisma.category.create({
      data: { name },
    });
    
    return res.status(201).json(successResponse("Category created successfully", category));
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    
    return res.status(200).json(successResponse("Category updated successfully", category));
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.category.delete({ 
      where: { id: parseInt(id) } 
    });
    
    return res.status(200).json(successResponse("Category deleted successfully", null));
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
};