import express from "express";
import cors from "cors";
import 'dotenv/config';
// Routes imports
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import recordRoutes from "./routes/record.routes.js"
import categoryRoutes from "./routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT,()=>{
    console.log("server running⌛");
})

export default app;