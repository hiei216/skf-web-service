import { RequestHandler } from "express";

import Verse from "../../models/verse";

export const createNote: RequestHandler = async (req, res, next) => {
  const { verseId, data } = req.body;
  const timeStamp = new Date();

  try {
    await Verse.findByIdAndUpdate(
      { _id: verseId },
      { $push: { 'verseData.notes': data } },
    );
  } catch (err) {
    console.log("err", err);
  }

  res.status(201).json({
    createdAt: timeStamp,
    updatedData: data,
  });
};
