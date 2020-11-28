import { ElectricityType } from "carbon-footprint";
import { Sequelize, Model, DataTypes, STRING } from "sequelize";
import { database } from "./db";
import { User } from "./user.model";

export class Footprint extends Model {
  public id!: number;
  public apiKey!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const FootprintTypeValues = [
  "car",
  "bus",
  "plane",
  "food",
  "streaming",
  "electricty",
];

Footprint.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    footprintType: {
      type: DataTypes.ENUM(...FootprintTypeValues),
      allowNull: false,
    },
  },
  {
    tableName: "footprints",
    sequelize: database,
  }
);
