import { RequestHandler } from 'express';

import Participant from '../../models/participant';

export const getSavedParticipants: RequestHandler = async (req, res, next) => {
  const foundParticipants: any = [];

  try {
    const participants = await Participant.find();
    foundParticipants.push(...participants);
  } catch (err) {
    console.log('err', err);
  }

  if (!foundParticipants) {
    res.status(200).write('No data found');
  }

  res.status(201).json({ participants: foundParticipants });
};
