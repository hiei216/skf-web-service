import { Router } from 'express';
import bibleControllers from '../controllers/bible-controllers/index';

const router = Router();

router.post('/create-note', bibleControllers.createNote);
router.get('/get-verse-notes/:verseId', bibleControllers.getVerseNotes);
router.post('/create-verses', bibleControllers.createVerses);
router.get('/get-todays-verses', bibleControllers.getTodaysVerses);
router.get('/get-filtered-verses', bibleControllers.getFilteredVerses);
router.put('/delete-verse-note/:verseId/note-id/:id', bibleControllers.deleteVerseNote);

export default router;
