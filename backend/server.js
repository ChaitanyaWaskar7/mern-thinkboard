import express from "express";
import { connectDb } from "./src/config/db.js";
import cors from "cors"

import noteRoutes from "./src/routes/noteRoutes.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

// middleware for getting input in json format
app.use(express.json())
app.use(cors({
  origin:"http://localhost:5173"
}))
app.use(rateLimiter)



// custom middleware 
// app.use((req,res,next) => {
//   console.log("just got req");
//   next();
// })

app.use("/api/notes", noteRoutes);



connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port :", PORT);
  });
})
