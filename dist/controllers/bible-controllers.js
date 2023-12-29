"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticipant = exports.getSavedParticipants = exports.getFilteredVerses = exports.getTodaysVerses = exports.createVerses = void 0;
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
        foundVerses.push(...verses);
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
const getFilteredVerses = async (req, res, next) => {
    const { firstName, lastName, startDate, endDate } = req.query;
    const start = new Date(startDate ? startDate.toString() : "");
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate ? endDate.toString() : "");
    end.setHours(23, 59, 59, 999);
    const foundVerses = [];
    try {
        const verses = await verse_1.default.find({
            ...(startDate ? { createdAt: { $gt: start } } : {}),
            ...(endDate ? { createdAt: { $lt: end } } : {}),
            participants: {
                $elemMatch: {
                    ...(lastName ? { lastName } : {}),
                    ...(firstName ? { firstName } : {}),
                },
            },
        });
        foundVerses.push(...verses);
    }
    catch (err) {
        console.log("err", err);
    }
    if (!foundVerses) {
        res.status(200).write("No data found");
    }
    res.status(201).json({ foundVerses });
};
exports.getFilteredVerses = getFilteredVerses;
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
    const foundParticipant = await participant_1.default.find({
        firstName,
        lastName,
        email,
    });
    const createdParticipant = [];
    if (foundParticipant.length > 0) {
        res.status(400).json({
            message: "Participant was already found in database",
            data: foundParticipant,
        });
    }
    try {
        await participant_1.default.create({
            createdAt: new Date(),
            firstName,
            lastName,
            email,
        });
        createdParticipant.push({
            createdAt: new Date(),
            firstName,
            lastName,
            email,
        });
    }
    catch (err) {
        console.log("err", err);
    }
    res.status(201).json({
        message: "Participant was succesfully created",
        data: createdParticipant,
    });
};
exports.createParticipant = createParticipant;
//# sourceMappingURL=bible-controllers.js.map