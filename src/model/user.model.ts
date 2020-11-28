import { Sequelize, Model, DataTypes, STRING } from "sequelize";
import { database } from "./db";

export class User extends Model {
  public id!: number;
  public apiKey!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    apiKey: {
      type: new STRING(32),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: database,
  }
);

User.sync().then(() => console.log("User table created"));
