import { Router } from "express";
import { createVerses, getTodaysVerses } from '../controllers/bible-controllers';

const router = Router();

router.post("/create-verses", createVerses);
router.get("/get-todays-verses", getTodaysVerses);

export default router;
