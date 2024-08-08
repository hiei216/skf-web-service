"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredVerses = void 0;
const verse_1 = __importDefault(require("../../models/verse"));
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
            ...(lastName ? { lastName } : {}),
            ...(firstName ? { firstName } : {}),
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
//# sourceMappingURL=get-filtered-verses.js.map