import { Sequelize, Model, DataTypes, STRING } from "sequelize";
import { database } from "./db";
import { User } from "./user.model";

export class HistoricalData extends Model {
  public id!: number;
  public value!: number;
  public transport!: string;
  public totalDistance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HistoricalData.init(
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
  },
  {
    tableName: "historical_data",
    sequelize: database,
  }
);
