"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerses = void 0;
const verse_1 = __importDefault(require("../models/verse"));
const mongoose_1 = __importDefault(require("mongoose"));
const createVerses = async (req, res, next) => {
    const createdVerse = new verse_1.default({
        createdAt: new Date(),
        participants: [
            {
                firstName: "Jirko",
                lastName: "Dvorak",
                email: "jiri.dvorak@gmx.de",
                verse: "This is an cool bible verse!!",
            },
        ],
    });
    try {
        const sess = await mongoose_1.default.startSession();
        sess.startTransaction();
        await createdVerse.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        console.log('err', err);
        return next(err);
    }
    res.status(201).json({ verses: '??' });
};
exports.createVerses = createVerses;
//# sourceMappingURL=bible-controllers.js.map