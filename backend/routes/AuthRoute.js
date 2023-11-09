import express from "express";
import { Login, Authentication, Logout } from "../controller/Auth.js";

const router = express.Router();

router.post("/login", Login);
router.get("/login", Authentication);
router.delete("/logout", Logout);

export default router;
