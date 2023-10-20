"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerses = void 0;
const verse_1 = __importDefault(require("../models/verse"));
const createVerses = async (req, res, next) => {
    const verses = [];
    try {
        const createdVerse = {
            createdAt: new Date(),
            participants: [
                {
                    firstName: "Anton",
                    lastName: "Anton",
                    email: "jiri.dvorak@gmx.de",
                    verse: "This is an cool bible verse!!",
                },
                {
                    firstName: "Anton",
                    lastName: "Anton",
                    email: "jiri.dvorak@gmx.de",
                    verse: "This is an cool bible verse!!",
                },
            ],
        };
        await verse_1.default.create(createdVerse);
        verses.push(createdVerse);
    }
    catch (err) {
        console.log("err", err);
        return next(err);
    }
    res.status(201).json({ verses });
};
exports.createVerses = createVerses;
//# sourceMappingURL=bible-controllers.js.map