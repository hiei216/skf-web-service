import { Router } from "express";
import { sendTemplateEmail } from '../controllers/email-controllers';

const router = Router();

router.post("/send-email", sendTemplateEmail);

export default router;
