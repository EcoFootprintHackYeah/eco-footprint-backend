import { Request, Response } from "express";

import { User } from "../model/user.model";
import { getAdviceForUser } from "../advice/advicesService";

export class AdvicesController {
  public getDailyAdvice(req: Request, res: Response) {
    const sessionUser = res.locals.user as User;
    res.json(getAdviceForUser(sessionUser));
  }
}
