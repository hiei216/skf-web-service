import { getBibleVerseFromBibleSk } from "../services/bible-service";
import Verse from "../models/verse";
import { RequestHandler } from "express";
import { EXAMPLE_VERSES } from "../services/example-verses-service";
import { getRandomNumber } from "../services/random-number-service";

export const createVerses: RequestHandler = async (req, res, next) => {
  const participants = req.body.participants;
  const readyParticipants: any = [];

  for (const { firstName, lastName, email } of participants) {
    const randomNumber = getRandomNumber(EXAMPLE_VERSES.length);

    try {
      const bibleVerseEntry = await getBibleVerseFromBibleSk(
        EXAMPLE_VERSES[randomNumber]
      );
      readyParticipants.push({
        firstName,
        lastName,
        email,
        verseData: bibleVerseEntry,
      });
    } catch (err) {
      console.log("err", err);
      return next(err);
    }
  }

  await Verse.create({
    createdAt: new Date(),
    participants: readyParticipants,
  });

  res.status(201).json({
    createdAt: new Date(),
    participants: readyParticipants,
  });
};

export const getTodaysVerses: RequestHandler = async (req, res, next) => {
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const endToday = new Date();
  endToday.setHours(23, 59, 59, 999);

  const foundVerses: any = [];

  try {
    const verses = await Verse.find({
      createdAt: { $gt: startToday, $lt: endToday },
    });
    foundVerses.push(verses);
  } catch (err) {
    return next(err);
  }

  if (!foundVerses) {
    res.status(200).write("No data found");
  }

  res.status(201).json({ foundVerses });
};
