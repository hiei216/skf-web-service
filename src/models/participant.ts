import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  email: String,
});

export default mongoose.model("Participant", ParticipantSchema);
