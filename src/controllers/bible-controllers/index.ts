import { createVerses } from './create-verse';
import { getTodaysVerses } from './get-todays-verse';
import { getFilteredVerses } from './get-filtered-verses';
import { createNote } from '../bible-controllers/create-note';
import { getVerseNotes } from './get-verse-notes';
import { deleteVerseNote } from './delete-verse-note';

export default {
  deleteVerseNote,
  createNote,
  createVerses,
  getVerseNotes,
  getTodaysVerses,
  getFilteredVerses,
};
