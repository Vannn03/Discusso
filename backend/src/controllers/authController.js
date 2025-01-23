import prisma from "../databases/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if all inputs is null
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Invalid inputs!" });
    }

    // Find user with matched email
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (user) {
        return res.status(409).json({ error: "Email already exist!" });
    }

    // Create new user
    try {
        const createUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: "Create user successful!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user!" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user with matched email
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        // Check if password matches
        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({ error: "Wrong password!" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const oneDay = 24 * 60 * 60 * 1000;

        // Set HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true, // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production", // Enable secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Handle cross-origin in production
            maxAge: oneDay,
        });

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to login!" });
    }
};

export const logout = (req, res) => {
    try {
        // Clear the `authToken` cookie
        res.clearCookie("authToken");
        res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to log out!" });
    }
};
