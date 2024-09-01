import { RequestHandler, Request, Response } from "express";

import Verse from "../../models/verse";

export const getFilteredVerses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { firstName, lastName, startDate, endDate } = req.query;

  const start = new Date(startDate ? startDate.toString() : "");
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate ? endDate.toString() : "");
  end.setHours(23, 59, 59, 999);

  const foundVerses: any = [];

  try {
    const verses = await Verse.find({
      ...(startDate ? { createdAt: { $gt: start } } : {}),
      ...(endDate ? { createdAt: { $lt: end } } : {}),
      ...(lastName ? { lastName } : {}),
      ...(firstName ? { firstName } : {}),
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
