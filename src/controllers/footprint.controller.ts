import { transport } from "carbon-footprint";
import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
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
      break;
    case "biking":
      value = transport.motorbike;
      break;
    case "driving":
      value = transport.car;
      break;
    default:
      value = transport.car;
      break;
  }
  return value * (totalDistance * 1000);
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

  public async getMonthlyFootprint(req: Request, res: Response) {
    const sessionUser = res.locals.user as User;
    const footprint = sessionUser.computeDailyCarbonFootprint();
    const dateFrom = moment(Date.now()).startOf("month");
    const footprints = await Footprint.findAll({
      where: {
        createdAt: {
          [Op.gt]: dateFrom.toDate(),
          [Op.lte]: Date.now(),
        },
        userId: sessionUser.id,
      },
    });

    const totalMonthly = footprints.reduce((a, b) => a + b.value, 0);
    const totalAggregatedDaily = footprint * moment().diff(dateFrom, "days");
    res.status(200).json({ total: totalMonthly + totalAggregatedDaily });
  }
}
