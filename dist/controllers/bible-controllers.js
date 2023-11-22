"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticipant = exports.getSavedParticipants = exports.getTodaysVerses = exports.createVerses = void 0;
const bible_service_1 = require("../services/bible-service");
const verse_1 = __importDefault(require("../models/verse"));
const participant_1 = __importDefault(require("../models/participant"));
const example_verses_service_1 = require("../services/example-verses-service");
const random_number_service_1 = require("../services/random-number-service");
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
const getTodaysVerses = async (req, res, next) => {
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);
    const foundVerses = [];
    try {
        const verses = await verse_1.default.find({
            createdAt: { $gt: startToday, $lt: endToday },
        });
        foundVerses.push(verses);
    }
    catch (err) {
        console.log("err", err);
    }
    if (!foundVerses) {
        res.status(200).write("No data found");
    }
    res.status(201).json({ foundVerses });
};
exports.getTodaysVerses = getTodaysVerses;
const getSavedParticipants = async (req, res, next) => {
    const foundParticipants = [];
    try {
        const participants = await participant_1.default.find();
        foundParticipants.push(...participants);
    }
    catch (err) {
        console.log("err", err);
    }
    if (!foundParticipants) {
        res.status(200).write("No data found");
    }
    res.status(201).json({ participants: foundParticipants });
};
exports.getSavedParticipants = getSavedParticipants;
const createParticipant = async (req, res, next) => {
    const { firstName, lastName, email } = req.body.participant;
    try {
        await participant_1.default.create({
            createdAt: new Date(),
            firstName,
            lastName,
            email,
        });
    }
    catch (err) {
        console.log("err", err);
    }
    const foundParticipant = await participant_1.default.find({
        firstName,
        lastName,
        email,
    });
    if (foundParticipant) {
        res.status(201).json({
            foundParticipant,
        });
    }
    res.status(400).json({});
};
exports.createParticipant = createParticipant;
//# sourceMappingURL=bible-controllers.js.map