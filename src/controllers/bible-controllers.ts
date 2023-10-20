import Verse from "../models/verse";
import { RequestHandler } from "express";

export const createVerses: RequestHandler = async (req, res, next) => {
  const verses: any = [];

  try {
    const createdVerse = {
      createdAt: new Date(),
      participants: [
        {
          firstName: "Anton",
          lastName: "Anton",
          email: "jiri.dvorak@gmx.de",
          verse: "This is an cool bible verse!!",
        },
        {
          firstName: "Anton",
          lastName: "Anton",
          email: "jiri.dvorak@gmx.de",
          verse: "This is an cool bible verse!!",
        },
      ],
    };
    await Verse.create(createdVerse);
    verses.push(createdVerse);
  } catch (err) {
    console.log("err", err);
    return next(err);
  }

  res.status(201).json({ verses });
};
