import { Router } from "express";
import AuthRoutes from "./auth/auth.routes.js";
import BookingRoutes from "./booking/booking.routes.js";
import CategoryRoutes from "./category/category.routes.js";
import ListingRoutes from "./listing/listing.routes.js";
import LocationRoutes from "./location/location.routes.js";
import UserRoutes from "./users/users.routes.js";

const MainRoutes = Router();

// /api/auth
MainRoutes.use("/auth", AuthRoutes);

// /api/bookings
MainRoutes.use("/bookings", BookingRoutes);

// /api/categories
MainRoutes.use("/categories", CategoryRoutes);

// /api/listings
MainRoutes.use("/listings", ListingRoutes);

// /api/locations
MainRoutes.use("/locations", LocationRoutes);

// /api/users
MainRoutes.use("/users", UserRoutes);

export default MainRoutes;