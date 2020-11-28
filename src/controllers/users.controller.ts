import { Request, Response } from "express";
import { Guid } from "guid-typescript";
import { User } from "../model/user.model";

interface CreationData {
  country: string;
  redMeatPerWeek: number;
  whiteMeatPerWeek: number;
  fishPerWeek: number;
  netflixHoursPerWeek: number;
  musicHoursPerDay: number;
  kwhPerMonth: number;
}

export class UsersController {
  public create(req: Request, res: Response) {
    // const userId = Guid.create();
    const body = req.body as CreationData;
    console.log(body);
    const apiKey = Guid.create();
    User.create<User>({ apiKey: apiKey.toString(), ...body })
      .then((user: User) => res.status(201).json(user))
      .catch((err: Error) => res.status(500).json(err));
  }

  // public updateFootprints(req: Request, res: Response) {
  //   const data = req.body as ;
  // }
}
