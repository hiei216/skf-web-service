"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedParticipants = void 0;
const participant_1 = __importDefault(require("../../models/participant"));
const getSavedParticipants = async (req, res) => {
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
//# sourceMappingURL=get-saved-participants.js.map