import { Router } from 'express';
import bibleControllers from '../controllers/bible-controllers/index';

const router = Router();

router.post('/create-verses', bibleControllers.createVerses);
router.get('/get-todays-verses', bibleControllers.getTodaysVerses);
// router.get('/get-filtered-verses', bibleControllers.getFilteredVerses);

export default router;
