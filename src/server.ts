import express, { Request, Response, NextFunction } from "express";
// import taskRoutes from './routes/tasks';
import bibleRoutes from "./routes/bible";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 8081;

app.use(express.json()); // Add this line to enable JSON parsing in the request body
// app.use('/tasks', taskRoutes); // Add this line to mount the Task API routes
app.use("/bible", bibleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

mongoose
  .connect('mongodb+srv://jiridvorak:u6HxWCOVRCsAy358@cluster0.xms1v8x.mongodb.net/skf-web-database?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => {
      console.log(`server running : http://localhost:8081`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// // start the server
// app.listen(port, () => {
//   console.log(`server running : http://localhost:8081`);
// });
