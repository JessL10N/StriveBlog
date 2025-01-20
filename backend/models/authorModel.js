import mongoose from "mongoose";
import "dotenv/config";

const authorSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  email: String,
  data_di_nascita: Date,
  avatar: String,
});

const Author = mongoose.model(process.env.AUTHOR_COLLECTION, authorSchema);

export default Author;
