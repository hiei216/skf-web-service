"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VerseSchema = new Schema({
    bookName: String,
    chapter: String,
    verseNumber: String,
    verses: [String],
});
const ParticipantsSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    verseData: VerseSchema,
});
const verseSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    participants: [ParticipantsSchema],
});
exports.default = mongoose_1.default.model('Verse', verseSchema);
//# sourceMappingURL=verse.js.map