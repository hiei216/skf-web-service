import express, { Request, Response, NextFunction } from "express";
import bibleRoutes from "./routes/bible";
import participantRoutes from "./routes/participant";
import emailRoutes from "./routes/email";
import loginRoutes from "./routes/login";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 8081;

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use(cors());

app.use("/bible", bibleRoutes);
app.use("/participant", participantRoutes);
app.use("/email", emailRoutes);
app.use("/login", loginRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

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
