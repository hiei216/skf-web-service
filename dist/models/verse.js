"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ParticipantsSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    verse: String,
});
const verseSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    participants: [ParticipantsSchema],
});
exports.default = mongoose_1.default.model("Verse", verseSchema);
//# sourceMappingURL=verse.js.map