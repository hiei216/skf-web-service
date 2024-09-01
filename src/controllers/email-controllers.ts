import { RequestHandler, Request, Response } from "express";

import { sendEmail } from "../services/email-service/email-service";

export const sendTemplateEmail: RequestHandler = (
  req: Request,
  res: Response
) => {
  const { recipient, template } = req.body.email;

    try {
      sendEmail(template, recipient);
      res.status(201).json({
        status: "Email was send succesfully!",
      });
    } catch (err) {
      console.log("err", err);
      res.status(201).json({
        status: "Error - email was not sent!",
      });
    }
};
