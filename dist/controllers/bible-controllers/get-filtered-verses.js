"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredVerses = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const verse_1 = __importDefault(require("../../models/verse"));
const getFilteredVerses = async (req, res) => {
    const { firstName, lastName, startDate, endDate } = req.query;
    const dateQuery = {};
    if (startDate) {
        const start = moment_timezone_1.default.tz(startDate, "Europe/Berlin").startOf("day").toDate();
        dateQuery.createdAt = { $gte: start };
    }
    if (endDate) {
        const end = moment_timezone_1.default.tz(endDate, "Europe/Berlin").endOf("day").toDate();
        if (dateQuery.createdAt) {
            dateQuery.createdAt.$lte = end;
        }
        else {
            dateQuery.createdAt = { $lte: end };
        }
    }
    const foundVerses = [];
    try {
        const verses = await verse_1.default.find({
            ...dateQuery,
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