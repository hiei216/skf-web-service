import { RequestHandler, Request, Response } from "express";

import Participant from "../../models/participant";

export const createParticipant: RequestHandler = async (
  req: Request,
  res: Response
) => {
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
