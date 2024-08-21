import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";

import Verse from "../../models/verse";

export const createNote: RequestHandler = async (req, res, next) => {
  const { verseId, data } = req.body;
  const timeStamp = new Date();

  try {
    await Verse.findByIdAndUpdate(
      { _id: verseId },
      {
        $push: {
          "verseData.notes": { id: uuidv4(), createdAt: timeStamp, ...data },
        },
      }
    );
  } catch (err) {
    console.log("err", err);
  }

  res.status(201).json({
    createdAt: timeStamp,
    updatedData: data,
  });
};
