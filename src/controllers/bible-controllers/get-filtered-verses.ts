import { RequestHandler, Request, Response } from "express";

import Verse from "../../models/verse";
import moment from "moment-timezone";

export const getFilteredVerses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { firstName, lastName, dateFrom, dateTo } = req.query;

  const dateQuery: any = {};

  if (dateFrom) {
    const start = moment.tz(dateFrom, "Europe/Berlin").startOf("day").toDate();
    dateQuery.createdAt = { $gte: start };
  }

  if (dateTo) {
    const end = moment.tz(dateTo, "Europe/Berlin").endOf("day").toDate();

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
