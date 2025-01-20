import express from "express";
import {
  createBlogPost,
  deleteBlogPost,
  modifyBlogPost,
  queryAllBlogPosts,
  queryBlogPagesCount,
  queryBlogPostById,
  queryPaginatedBlogPosts,
  searchBlogPosts,
} from "../controllers/blogPostQueries.js";

const router = express.Router();

router.get("/count", queryBlogPagesCount);
router.get("/post/:id", queryBlogPostById);
router.post("/post/new", createBlogPost);
router.put("/post/:id", modifyBlogPost);
router.get("/page/:page", queryPaginatedBlogPosts);
router.post("/search", searchBlogPosts);
router.get("/", queryAllBlogPosts);
router.delete("/post/:id", deleteBlogPost);

export { router };
