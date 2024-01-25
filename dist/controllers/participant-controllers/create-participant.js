"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticipant = void 0;
const participant_1 = __importDefault(require("../../models/participant"));
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
            message: 'Participant was already found in database',
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
        console.log('err', err);
    }
    res.status(201).json({
        message: 'Participant was succesfully created',
        data: createdParticipant,
    });
};
exports.createParticipant = createParticipant;
//# sourceMappingURL=create-participant.js.map