import express from 'express';
import { createAuhtor, deleteAuthor, modifyAuthor, queryAllAuthors, queryAuthorById } from '../controllers/authorQueries.js';

const router = express.Router();

router.get("/", queryAllAuthors); //senza parentesi perché è una callback
router.get("/:id", queryAuthorById);
router.post("/new", createAuhtor);
router.put("/:id", modifyAuthor);
router.delete("/:id", deleteAuthor);

export { router } ;