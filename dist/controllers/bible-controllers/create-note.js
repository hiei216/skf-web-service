"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = void 0;
const uuid_1 = require("uuid");
const verse_1 = __importDefault(require("../../models/verse"));
const createNote = async (req, res, next) => {
    const { verseId, data } = req.body;
    const timeStamp = new Date();
    try {
        await verse_1.default.findByIdAndUpdate({ _id: verseId }, {
            $push: {
                "verseData.notes": { id: (0, uuid_1.v4)(), createdAt: timeStamp, ...data },
            },
        });
    }
    catch (err) {
        console.log("err", err);
    }
    res.status(201).json({
        createdAt: timeStamp,
        updatedData: data,
    });
};
exports.createNote = createNote;
//# sourceMappingURL=create-note.js.map