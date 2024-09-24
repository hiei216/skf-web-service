import express, { Request, Response, NextFunction } from "express";
import bibleRoutes from "./routes/bible";
import participantRoutes from "./routes/participant";
import emailRoutes from "./routes/email";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.use("/bible", bibleRoutes);
app.use("/participant", participantRoutes);
app.use("/email", emailRoutes);

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

mongoose
  .connect(process.env.MONGO_LOGIN)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running : http://localhost:8081`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
