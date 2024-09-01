import { RequestHandler, Request, Response } from "express";

import Verse from "../../models/verse";
import { getBibleVerseFromBibleSk } from "../../services/bible-service";
import { EXAMPLE_VERSES } from "../../services/example-verses-service";
import { getRandomNumber } from "../../services/random-number-service";

export const createVerses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const participants = req.body.participants;
  const readyParticipants: any = [];
  const timeStamp = new Date();

  for (const { firstName, lastName, email } of participants) {
    const randomNumber = getRandomNumber(EXAMPLE_VERSES.length);

    try {
      const bibleVerseEntry = await getBibleVerseFromBibleSk(
        EXAMPLE_VERSES[randomNumber]
      );
      await Verse.create({
        createdAt: timeStamp,
        firstName,
        lastName,
        email,
        verseData: bibleVerseEntry,
      });
      readyParticipants.push({
        createdAt: timeStamp,
        firstName,
        lastName,
        email,
        verseData: bibleVerseEntry,
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  res.status(201).json({
    createdAt: timeStamp,
    participants: readyParticipants,
  });
};
