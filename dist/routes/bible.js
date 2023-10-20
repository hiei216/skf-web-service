"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bible_controllers_1 = require("../controllers/bible-controllers");
const router = (0, express_1.Router)();
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
router.post("/create-verses", bible_controllers_1.createVerses);
exports.default = router;
//# sourceMappingURL=bible.js.map