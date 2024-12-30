import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Business } from "../models/Business";

interface CreateBusinessRequestBody {
  name: string;
  description: string;
  category: string;
}

// Controller to list all businesses (public)
export const listBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses); // Return all businesses
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ error: "Failed to fetch businesses. Please try again later." });
  }
};

// Controller to create a new business (protected)
export const createBusiness = async (
  req: CustomRequest<CreateBusinessRequestBody>,
  res: Response
): Promise<void> => {
  const { name, description, category } = req.body;

  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized. Please log in." });
      return; // Ensure the function stops here
    }

    // Create a new business
    const business = new Business({
      name,
      description,
      category,
      owner: userId,
    });

    await business.save();

    res.status(201).json({ message: "Business created successfully!", business });
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ error: "Failed to create business. Please try again later." });
  }
};

// Controller to fetch businesses owned by the logged-in user (protected)
export const getMyBusinesses = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized. Please log in." });
      return;
    }

    // Fetch businesses owned by the user
    const businesses = await Business.find({ owner: userId });

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching user's businesses:", error);
    res.status(500).json({ error: "Failed to fetch your businesses. Please try again later." });
  }
};
