import { Router } from "express";
import { loginIn, signUp } from "./auth.controller";

const AuthRoutes= Router();

// /api/auth/signup
AuthRoutes.post("/signup", signUp);

// /api/auth/login
AuthRoutes.post("/login", loginIn);

export default AuthRoutes;