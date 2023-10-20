import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ParticipantsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  verse: String,
});

const verseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  participants: [ParticipantsSchema],
});

export default mongoose.model("Verse", verseSchema);
