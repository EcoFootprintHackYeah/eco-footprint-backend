import { transport } from "carbon-footprint";
import { Request, Response } from "express";
import { Footprint } from "../model/footprint.model";

import { User } from "../model/user.model";

interface CreationData {
  transport: string;
  totalDistance: number;
  avgSpeed: number;
}

const transportAndDistanceToFootprint = (
  means: string,
  totalDistance: number
): number => {
  let value;
  switch (means) {
    case "jogging":
    case "walking":
      value = 0;
    case "biking":
      value = transport.motorbike;
    case "driving":
      value = transport.car;
    default:
      value = transport.car;
  }
  return value * totalDistance;
};

export class FootprintController {
  public getDailyBase(req: Request, res: Response) {
    const sessionUser = res.locals.user as User;
    res.json({ dailyBase: sessionUser.computeDailyCarbonFootprint() });
  }

  public addTrip(req: Request, res: Response) {
    const sessionUser = res.locals.user as User;
    const body = req.body as CreationData;
    console.log(sessionUser);
    const value = transportAndDistanceToFootprint(
      body.transport,
      body.totalDistance
    );

    Footprint.create<Footprint>({
      userId: sessionUser.id,
      value: value,
      ...body,
    })
      .then((data: Footprint) => res.status(201).json(data))
      .catch((err: Error) => res.status(500).json(err));
  }
}
