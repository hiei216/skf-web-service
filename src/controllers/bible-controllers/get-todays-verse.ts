import { RequestHandler, Request, Response } from "express";

import Verse from "../../models/verse";

export const getTodaysVerses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const endToday = new Date();
  endToday.setHours(23, 59, 59, 999);

  const foundVerses: any = [];

  try {
    const verses = await Verse.find({
      createdAt: { $gt: startToday, $lt: endToday },
    });
    foundVerses.push(...verses);
  } catch (err) {
    console.log("err", err);
  }

  if (!foundVerses) {
    res.status(200).write("No data found");
  }

  res.status(201).json({ foundVerses });
};
