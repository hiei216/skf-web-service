"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ParticipantSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    firstName: String,
    lastName: String,
    email: String,
});
ParticipantSchema.index({ firstName: 1, lastName: 1, email: 1 }, { unique: true });
exports.default = mongoose_1.default.model("Participant", ParticipantSchema);
//# sourceMappingURL=participant.js.map