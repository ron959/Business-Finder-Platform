import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../utils/jwtUtils";

// Define interfaces for request body data
interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
  plan?: "Standard" | "Gold" | "Platinum"; // Plan is optional in case it defaults
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// Signup Handler
export const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
): Promise<void> => {
  const { name, email, password, plan } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "Email is already registered!" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword, plan });
    await user.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Login Handler
export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken({ id: user._id, email: user.email, plan: user.plan });
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
