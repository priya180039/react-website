import express from "express";
import {
  getReplies,
  getRepliesByThread,
  createReply,
  updateReply,
  deleteReply,
  getRepliesByUser,
} from "../controller/ReplyController.js";
import { verifyUser, expertOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/replies", verifyUser, getReplies);
router.get("/replies/:id", verifyUser, getRepliesByThread);
router.get("/user-replies", verifyUser, expertOnly, getRepliesByUser);
router.post("/replies", verifyUser, expertOnly, createReply);
router.patch("/replies/:id", verifyUser, expertOnly, updateReply);
router.delete("/replies/:id", verifyUser, expertOnly, deleteReply);

export default router;
