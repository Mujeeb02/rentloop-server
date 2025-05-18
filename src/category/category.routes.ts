import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";

const CategoryRoutes = Router();

// GET /api/categories/getAllCategories - Get all categories
CategoryRoutes.get("/getAllCategories", getAllCategories);

// GET /api/categories/getCategoryById/:id - Get category by ID
CategoryRoutes.get("/getCategoryById/:id", getCategoryById);

// POST /api/categories/createCategory - Create new category
CategoryRoutes.post("/createCategory", createCategory);

// PUT /api/categories/updateCategory/:id - Update category
CategoryRoutes.put("/updateCategory/:id", updateCategory);

// DELETE /api/categories/deleteCategory/:id - Delete category
CategoryRoutes.delete("/deleteCategory/:id", deleteCategory);

export default CategoryRoutes;
