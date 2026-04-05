import express from "express";
import cors from "cors";
import 'dotenv/config';
import type { Request,Response,NextFunction } from "express";  

// Routes imports
import authRoutes from "../src/routes/auth.routes.js";
import userRoutes from "../src/routes/user.routes.js";
import recordRoutes from "../src/routes/record.routes.js"
import categoryRoutes from "../src/routes/category.routes.js";
import dashboardRoutes from "../src/routes/dashboard.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Backend is Up and Running!");
})
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// app.listen(PORT,()=>{
//     console.log("server running⌛");
// })

export default app;