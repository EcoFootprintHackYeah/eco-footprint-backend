import { Footprint } from "./footprint.model";
import { User } from "./user.model";

export const createDb = (force: boolean) => {
  // syncs
  User.sync({ force: force }).then(() => console.log("User table created"));
  Footprint.sync({ force: force }).then(() =>
    console.log("footprints table created")
  );
};
