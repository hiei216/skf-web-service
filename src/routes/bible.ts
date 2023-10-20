import { Router, Request, Response } from "express";
import { createVerses } from '../controllers/bible-controllers';

const router = Router();

// router.get("/:bibleVerse", async (req: Request, res: Response) => {

//   try {
//     const response = await fetch(`${url}${req.params.bibleVerse}`, options);

//     const data = await response.json();
//     res.send(data);
//     // console.log("data", Promise.resolve(data));
//   } catch (error) {
//     res.status(404).send("Bible verse not found");
//     console.error("Error:", error);
//   }

//   // if (!response) {
//   //   res.status(404).send("Bible verse not found");
//   // } else {
//   //   res.json(bibleVerse);
//   // }
// });

router.post("/create-verses", createVerses);

export default router;
