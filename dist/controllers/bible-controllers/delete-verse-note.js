"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVerseNote = void 0;
const verse_1 = __importDefault(require("../../models/verse"));
const deleteVerseNote = async (req, res) => {
    const { verseId, id } = req.params;
    try {
        await verse_1.default.updateOne({
            _id: verseId,
        }, { $pull: { "verseData.notes": { id } } });
    }
    catch (err) {
        console.log("err", err);
    }
    res.status(200).json({
        message: "Concrete verse note was deleted",
        verseId,
    });
};
exports.deleteVerseNote = deleteVerseNote;
//# sourceMappingURL=delete-verse-note.js.map