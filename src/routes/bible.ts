import { Router } from "express";
import { createVerses, getTodaysVerses, getFilteredVerses, getSavedParticipants, createParticipant } from '../controllers/bible-controllers';

const router = Router();

router.post("/create-verses", createVerses);
router.get("/get-todays-verses", getTodaysVerses);
router.get("/get-filtered-verses", getFilteredVerses);
router.get("/get-saved-participants", getSavedParticipants);
router.post("/create-participant", createParticipant);

export default router;
