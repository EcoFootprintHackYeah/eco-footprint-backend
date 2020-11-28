import { Request, Response } from "express";

import { User } from "../model/user.model";

export class FootprintController {
  public getDailyBase(req: Request, res: Response) {
    const sessionUser = res.locals.user as User;
    res.json({ dailyBase: sessionUser.computeDailyCarbonFootprint() });
  }
}
