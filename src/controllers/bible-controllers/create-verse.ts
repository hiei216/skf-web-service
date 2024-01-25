import { RequestHandler } from "express";

import Verse from "../../models/verse";
import { getBibleVerseFromBibleSk } from "../../services/bible-service";
import { EXAMPLE_VERSES } from "../../services/example-verses-service";
import { getRandomNumber } from "../../services/random-number-service";

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