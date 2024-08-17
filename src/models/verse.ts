import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VerseEntrySchema = new Schema({
  bookName: String,
  chapter: String,
  verseNumber: String,
  verses: [String],
  notes: [Object],
});

const verseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  email: String,
  verseData: VerseEntrySchema,
});

export default mongoose.model("Verse", verseSchema);
