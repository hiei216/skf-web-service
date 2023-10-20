import Verse from "../models/verse";
import { RequestHandler } from "express";
import mongoose from "mongoose";

export const createVerses: RequestHandler = async (req, res, next) => {
//   const createdVerse = new Verse({
//     createdAt: new Date(),
//     participants: [
//       {
//         firstName: "Jirko",
//         lastName: "Dvorak",
//         email: "jiri.dvorak@gmx.de",
//         verse: "This is an cool bible verse!!",
//       },
//     ],
//   });


//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await createdVerse.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     console.log('err', err)
//     return next(err);
//   }

  res.status(201).json({ verses: 'no verses' });
};
