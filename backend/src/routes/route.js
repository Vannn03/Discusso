import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { deleteAccount, editUser } from "../controllers/userController.js";
import {
    authenticate,
    getLoggedInUser,
    verifyAuth,
} from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";
import express from "express";
import path from "path";

const router = Router();

// MIDDLEWARE FOR STATIC FILES
router.use("/uploads", express.static(path.resolve("uploads")));

// MIDDLEWARE
router.get("/auth/verify", verifyAuth);
router.get("/logged-user", authenticate, getLoggedInUser);

// AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

// USER
router.put(
    "/edit-user",
    authenticate,
    upload.single("profile_picture"),
    editUser
);
router.delete("/delete-account", authenticate, deleteAccount);

export default router;
