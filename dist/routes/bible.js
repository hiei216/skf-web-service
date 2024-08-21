"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../controllers/bible-controllers/index"));
const router = (0, express_1.Router)();
router.post('/create-note', index_1.default.createNote);
router.get('/get-verse-notes/:verseId', index_1.default.getVerseNotes);
router.post('/create-verses', index_1.default.createVerses);
router.get('/get-todays-verses', index_1.default.getTodaysVerses);
router.get('/get-filtered-verses', index_1.default.getFilteredVerses);
router.put('/delete-verse-note/:verseId/note-id/:id', index_1.default.deleteVerseNote);
exports.default = router;
//# sourceMappingURL=bible.js.map