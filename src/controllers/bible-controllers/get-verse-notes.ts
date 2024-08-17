import { RequestHandler } from "express";

import Verse from "../../models/verse";

export const getVerseNotes: RequestHandler = async (req, res, next) => {
  const { verseId } = req.params;

  const foundNotes: any = [];

  try {
    const verse = await Verse.find({
      _id: verseId,
    });
    foundNotes.push(...verse[0].verseData.notes);
  } catch (err) {
    console.log("err", err);
  }

  res.status(200).json({
    message: "Verse ID received and concrete verse notes",
    verseId,
    notes: foundNotes,
  });
};
