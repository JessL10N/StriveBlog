import express from "express";
import { createComment, getComments, createReply } from "../controllers/commentQueries.js";

const router = express.Router();

router.get("/:id", getComments);
router.post("/:id", createComment);
router.post("/:id/comments/:commentId/reply", createReply);

export { router };