"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerses = void 0;
const verse_1 = __importDefault(require("../../models/verse"));
const bible_service_1 = require("../../services/bible-service");
const example_verses_service_1 = require("../../services/example-verses-service");
const random_number_service_1 = require("../../services/random-number-service");
const createVerses = async (req, res, next) => {
    const participants = req.body.participants;
    const readyParticipants = [];
    for (const { firstName, lastName, email } of participants) {
        const randomNumber = (0, random_number_service_1.getRandomNumber)(example_verses_service_1.EXAMPLE_VERSES.length);
        try {
            const bibleVerseEntry = await (0, bible_service_1.getBibleVerseFromBibleSk)(example_verses_service_1.EXAMPLE_VERSES[randomNumber]);
            readyParticipants.push({
                firstName,
                lastName,
                email,
                verseData: bibleVerseEntry,
            });
        }
        catch (err) {
            console.log("err", err);
        }
    }
    await verse_1.default.create({
        createdAt: new Date(),
        participants: readyParticipants,
    });
    res.status(201).json({
        createdAt: new Date(),
        participants: readyParticipants,
    });
};
exports.createVerses = createVerses;
//# sourceMappingURL=create-verse.js.map