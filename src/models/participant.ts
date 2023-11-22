import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  email: String,
});

ParticipantSchema.index({ firstName: 1, lastName: 1, email: 1 }, { unique: true});

export default mongoose.model("Participant", ParticipantSchema);
