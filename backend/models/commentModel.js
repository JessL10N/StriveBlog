import mongoose from "mongoose";
import "dotenv/config";

const commentSchema = new mongoose.Schema({
    author: String,
    comment: String,
    likes: Number,
    blogPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost", // Associa il commento al modello BlogPost
      },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Comment = new mongoose.model(process.env.COMMENTS_COLLECTION, commentSchema);

export default Comment;