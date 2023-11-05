import { Router } from "express";
import { createVerses, getTodaysVerses, getSavedParticipants, createParticipant } from '../controllers/bible-controllers';

const router = Router();

router.post("/create-verses", createVerses);
router.get("/get-todays-verses", getTodaysVerses);
router.get("/get-saved-participants", getSavedParticipants);
router.post("/create-participant", createParticipant);

export default router;
