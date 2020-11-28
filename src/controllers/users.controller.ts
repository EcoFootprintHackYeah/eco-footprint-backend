import { Request, Response } from "express";
import { Guid } from "guid-typescript";
import { User } from "../model/user.model";

export class UsersController {
  public create(req: Request, res: Response) {
    // const userId = Guid.create();
    const apiKey = Guid.create();
    User.create<User>({ apiKey: apiKey.toString() })
      .then((user: User) => res.status(201).json(user))
      .catch((err: Error) => res.status(500).json(err));
  }

  public get(req: Request, res: Response) {
    User.findAll()
      .then((users: Array<User>) => {
        res.json(users);
      })
      .catch((err) => res.status(500).json(err));
  }
}
