import { Request, Response } from "express";
import moment from "moment";
import { col } from "sequelize";
import { fn } from "sequelize";
import { Op } from "sequelize";
import { Footprint } from "../model/footprint.model";
import { HistoricalData } from "../model/historical.model";
import _ from "lodash";
import { User } from "../model/user.model";

export class HistoricalDataController {
  public async getData(req: Request, res: Response) {
    const sessionUser = res.locals.user as User;
    const points = await HistoricalData.findAll({
      where: {
        createdAt: {
          [Op.gt]: moment(Date.now()).startOf("year"),
          [Op.lte]: Date.now(),
        },
        userId: sessionUser.id,
      },
      order: ["createdAt"],
    });
    const monthPoints = points.map((p) => {
      return {
        value: p.value,
        month: moment(p.createdAt).format("MMM"),
      };
    });
    res.status(200).json({ points: monthPoints });
  }
}
