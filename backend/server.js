import express from "express";
import { connectDb } from "./src/config/db.js";
import cors from "cors";

import path from "path";

import noteRoutes from "./src/routes/noteRoutes.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware for getting input in json format
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(rateLimiter);


  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });


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
});
