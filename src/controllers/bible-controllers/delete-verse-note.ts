import { RequestHandler, Request, Response } from "express";

import Verse from "../../models/verse";

export const deleteVerseNote: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { verseId, id } = req.params;

  try {
    await Verse.updateOne(
      {
        _id: verseId,
      },
      { $pull: { "verseData.notes": { id } } }
    );
  } catch (err) {
    console.log("err", err);
  }

  res.status(200).json({
    message: "Concrete verse note was deleted",
    verseId,
  });
};
