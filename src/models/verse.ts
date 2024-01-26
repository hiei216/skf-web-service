import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VerseSchema = new Schema({
  bookName: String,
  chapter: String,
  verseNumber: String,
  verses: [String],
});

const ParticipantsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  verseData: VerseSchema,
});

const verseSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  participants: [ParticipantsSchema],
});

export default mongoose.model('Verse', verseSchema);
