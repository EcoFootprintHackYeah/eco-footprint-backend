import { Footprint } from "./footprint.model";
import { HistoricalData } from "./historical.model";
import { User } from "./user.model";

export const createDb = async (force: boolean) => {
  // syncs
  await User.sync({ force: force });
  console.log("Users created");
  await Footprint.sync({ force: force });
  console.log("footprints table created");
  await HistoricalData.sync({ force: force });
  console.log("history table created");
};
