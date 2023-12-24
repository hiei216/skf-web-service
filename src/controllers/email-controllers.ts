import { RequestHandler } from "express";

import { sendEmail } from "../services/email-service/email-service";

export const sendTemplateEmail: RequestHandler = async (req, res, next) => {
//   const participants = req.body.participants;
//   const readyParticipants: any = [];

  try {
    sendEmail();
  } catch (err) {
    console.log("err", err);
  }

  res.status(201).json({
    status: "Email was send succesfully!",
  });
};
