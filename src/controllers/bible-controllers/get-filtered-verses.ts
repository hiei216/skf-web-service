import { RequestHandler, Request, Response } from "express";
import moment from "moment-timezone";

import Verse from "../../models/verse";

export const getFilteredVerses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { firstName, lastName, startDate, endDate } = req.query;

  const dateQuery: any = {};

  if (startDate) {
    const start = moment.tz(startDate, "Europe/Berlin").startOf("day").toDate();
    dateQuery.createdAt = { $gte: start };
  }

  if (endDate) {
    const end = moment.tz(endDate, "Europe/Berlin").endOf("day").toDate();

    if (dateQuery.createdAt) {
      dateQuery.createdAt.$lte = end;
    } else {
      dateQuery.createdAt = { $lte: end };
    }
  }

  const foundVerses: any = [];

  try {
    const verses = await Verse.find({
      ...dateQuery,
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
