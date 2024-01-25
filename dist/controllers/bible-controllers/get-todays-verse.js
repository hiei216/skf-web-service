"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysVerses = void 0;
const verse_1 = __importDefault(require("../../models/verse"));
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
//# sourceMappingURL=get-todays-verse.js.map