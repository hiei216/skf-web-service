"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerseNotes = void 0;
const verse_1 = __importDefault(require("../../models/verse"));
const getVerseNotes = async (req, res) => {
    const { verseId } = req.params;
    const foundNotes = [];
    try {
        const verse = await verse_1.default.find({
            _id: verseId,
        });
        foundNotes.push(...verse[0].verseData.notes);
    }
    catch (err) {
        console.log("err", err);
    }
    res.status(200).json({
        message: "Verse ID received and concrete verse notes",
        verseId,
        notes: foundNotes,
    });
};
exports.getVerseNotes = getVerseNotes;
//# sourceMappingURL=get-verse-notes.js.map