import { RequestHandler, Request, Response } from "express";

export const login: RequestHandler = (req: Request, res: Response) => {
  res.send({
    token: "test123",
  });
};
