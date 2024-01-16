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
    foundVerses.push(...verses);
  } catch (err) {
    console.log("err", err);
  }

  if (!foundVerses) {
    res.status(200).write("No data found");
  }

  res.status(201).json({ foundVerses });
};

export const getFilteredVerses: RequestHandler = async (req, res, next) => {
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
      participants: {
        $elemMatch: {
          ...(lastName ? { lastName } : {}),
          ...(firstName ? { firstName } : {}),
        },
      },
    });

    const cleanedVerses = verses.map((verse) => {
      const participants = verse.participants.filter(
        (element) =>
        element.firstName === firstName && element.lastName === lastName
      );
      return {
        _id: verse.id,
        createdAt: verse.createdAt,
        participants,
      };
    });

    const resultVerse = lastName || firstName ? cleanedVerses : verses;

    foundVerses.push(...resultVerse);
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

  const foundParticipant = await Participant.find({
    firstName,
    lastName,
    email,
  });

  const createdParticipant = [];

  if (foundParticipant.length > 0) {
    res.status(400).json({
      message: "Participant was already found in database",
      data: foundParticipant,
    });
  }

  try {
    await Participant.create({
      createdAt: new Date(),
      firstName,
      lastName,
      email,
    });
    createdParticipant.push({
      createdAt: new Date(),
      firstName,
      lastName,
      email,
    });
  } catch (err) {
    console.log("err", err);
  }

  res.status(201).json({
    message: "Participant was succesfully created",
    data: createdParticipant,
  });
};
