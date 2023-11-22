import { getBibleVerseFromBibleSk } from "../services/bible-service";
import Verse from "../models/verse";
import Participant from "../models/participant";
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
    console.log("err", err);
  }

  if (!foundVerses) {
    res.status(200).write("No data found");
  }

  res.status(201).json({ foundVerses });
};

export const getSavedParticipants: RequestHandler = async (req, res, next) => {
  const foundParticipants: any = [];

  try {
    const participants = await Participant.find();
    foundParticipants.push(...participants);
  } catch (err) {
    console.log("err", err);
  }

  if (!foundParticipants) {
    res.status(200).write("No data found");
  }

  res.status(201).json({ participants: foundParticipants });
};

export const createParticipant: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email } = req.body.participant;

  try {
    await Participant.create({
      createdAt: new Date(),
      firstName,
      lastName,
      email,
    });
  } catch (err) {
    console.log("err", err);
  }

  const foundParticipant = await Participant.find({
    firstName,
    lastName,
    email,
  });

  if (foundParticipant) {
    res.status(201).json({
      foundParticipant,
    });
  }

  res.status(400).json({});
};
