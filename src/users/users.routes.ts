import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./users.controller";

const UserRoutes = Router();

// GET /api/users/getAllUsers - Get all users
UserRoutes.get("/getAllUsers", getAllUsers);

// GET /api/users/getUserById/:id - Get user by ID
UserRoutes.get("/getUserById/:id", getUserById);

// PUT /api/users/updateUser/:id - Update user
UserRoutes.put("/updateUser/:id", updateUser);

// DELETE /api/users/deleteUser/:id - Delete user
UserRoutes.delete("/deleteUser/:id", deleteUser);

export default UserRoutes;
