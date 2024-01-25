import { Router } from "express";
import participantControllers  from '../controllers/participant-controllers/index';

const router = Router();

router.get("/get-saved-participants", participantControllers.getSavedParticipants);
router.post("/create-participant", participantControllers.createParticipant);

export default router;
