import { Sequelize } from "sequelize";

const user = "cristi";
const host = "localhost";
const dbName = "ecofootprint";
const password = "cristi";
const port = 5432;

export const database = new Sequelize({
  database: "some_db",
  dialect: "sqlite",
  storage: "test.db",
});
