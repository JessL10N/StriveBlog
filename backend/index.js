import express from "express";
import connectDatabase from "./config/database.js";
import cors from "cors";
import { router as authorRouter } from "./routes/authorRoutes.js";
import{ router as blogPostRouter } from "./routes/blogPostRoutes.js";
import { router as commentRouter } from "./routes/commentRoutes.js";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());
app.use(cors());

connectDatabase();


app.get("/", (req, res) =>{
    res.send("Ciao");
});

app.use("/api/authors", authorRouter);
app.use("/api/blog_posts", blogPostRouter);
app.use("/api/comments", commentRouter);

app.post("/api/login", (req, res) =>{
    const {email, password} = req.body;
    if (email === "a.b@example.com" && password === "123456"){
        res.json({
            isLoggedIn: true,
            token: jwt.sign({ id: "a.b@example.com"}, "123456", {
                expiresIn: "10000",
            })
        });
    }
});



app.listen(3001, () => {
    console.log("Server connesso alla porta 3001")
});