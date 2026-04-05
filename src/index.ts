import authRoutes from "./routes/auth.routes.js";
import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log("server running⌛");
})

export default app;