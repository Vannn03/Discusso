import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
    deleteAccount,
    editProfilePicture,
    editUser,
} from "../controllers/userController.js";
import {
    authenticate,
    getLoggedInUser,
    verifyAuth,
} from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

// MIDDLEWARE
router.get("/auth/verify", verifyAuth);
router.get("/logged-user", authenticate, getLoggedInUser);

// AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

// USER
router.put("/edit-user", authenticate, editUser);
router.put(
    "/edit-profile-picture",
    upload.single("profile_picture"),
    editProfilePicture
);
router.delete("/delete-account", authenticate, deleteAccount);

export default router;
