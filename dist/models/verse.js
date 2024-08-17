"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VerseEntrySchema = new Schema({
    bookName: String,
    chapter: String,
    verseNumber: String,
    verses: [String],
    notes: [Object],
});
const verseSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    firstName: String,
    lastName: String,
    email: String,
    verseData: VerseEntrySchema,
});
exports.default = mongoose_1.default.model("Verse", verseSchema);
//# sourceMappingURL=verse.js.map