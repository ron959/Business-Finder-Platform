import { Router } from "express";
import { listBusinesses, createBusiness, getMyBusinesses } from "../controllers/businessController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Public route to list all businesses
router.get("/", listBusinesses);

// Protected route to create a business
router.post("/", protect, createBusiness);

// Protected route to fetch user's businesses
router.get("/mine", protect, getMyBusinesses);

export default router;
