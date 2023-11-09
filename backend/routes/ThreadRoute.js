import express from "express";
import {
  getThreads,
  getThreadById,
  getThreadByUser,
  createThread,
  updateThread,
  deleteThread,
  getThreadByTag,
} from "../controller/ThreadController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/threads", verifyUser, getThreads);
router.get("/threads/:id", verifyUser, getThreadById);
router.get("/user-threads", verifyUser, getThreadByUser);
router.get("/tags/:tag", verifyUser, getThreadByTag);
router.post("/threads", verifyUser, createThread);
router.patch("/threads/:id", verifyUser, updateThread);
router.delete("/threads/:id", verifyUser, deleteThread);

export default router;
