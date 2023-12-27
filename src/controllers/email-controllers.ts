import { RequestHandler } from "express";

import { sendEmail } from "../services/email-service/email-service";
import { testTemplate } from "../services/email-service/templates/test";

export const sendTemplateEmail: RequestHandler = (req, res, next) => {
  const { data } = req.body.email;

  try {
    sendEmail(testTemplate, data);
  } catch (err) {
    console.log("err", err);
  }

  res.status(201).json({
    status: "Email was send succesfully!",
  });
};
