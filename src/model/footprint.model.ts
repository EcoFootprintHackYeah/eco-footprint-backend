import { ElectricityType } from "carbon-footprint";
import { Sequelize, Model, DataTypes, STRING } from "sequelize";
import { database } from "./db";
import { User } from "./user.model";

export class Footprint extends Model {
  public id!: number;
  public value!: number;
  public transport!: string;
  public totalDistance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    value: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
    },
    totalDistance: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
    },
    avgSpeed: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
    },
    transport: {
      type: new STRING(32),
      allowNull: false,
    },
  },
  {
    tableName: "footprints",
    sequelize: database,
  }
);
