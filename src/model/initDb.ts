import { Footprint } from "./footprint.model";
import { HistoricalData } from "./historical.model";
import { User } from "./user.model";

export const createDb = (force: boolean) => {
  // syncs
  User.sync({ force: force }).then(() => console.log("User table created"));
  Footprint.sync({ force: force }).then(() =>
    console.log("footprints table created")
  );
  HistoricalData.sync({ force: force }).then(() =>
    console.log("created historical data")
  );
};
