import {
  ElectricityType,
  food,
  getInternetUsageCarbonImpact,
  streaming,
} from "carbon-footprint";
import { count } from "console";
import {
  Sequelize,
  Model,
  DataTypes,
  STRING,
  IntegerDataType,
} from "sequelize";
import electricityCarbonService from "../electricityCarbonService";
import { database } from "./db";

const FoodPortion = 0.15; // kg

const AllowedCountries = Object.keys(ElectricityType).map((k) => k);

export class User extends Model {
  public id!: number;
  public apiKey!: string;
  public redMeatPerWeek!: number;
  public whiteMeatPerWeek!: number;
  public fishPerWeek!: number;
  public netflixHoursPerWeek!: number;
  public musicHoursPerDay!: number;
  public country!: string;
  public kwhPerMonth!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public computeDailyCarbonFootprint(): number {
    // electricity.
    return (
      this.getElectricityFootprint() +
      this.getMusicFootprint() +
      this.getStreamingFootprint() +
      this.getFoodFootprint()
    );
  }

  public getElectricityFootprint() {
    const lowerCasedCountry = this.country.toLowerCase();
    const electricityPrice = (<any>electricityCarbonService)[lowerCasedCountry];
    console.log(electricityPrice);
    return electricityPrice * (this.kwhPerMonth / 30);
  }

  public getStreamingFootprint() {
    return getInternetUsageCarbonImpact(
      (this.netflixHoursPerWeek / 7) * 3600, // seconds
      streaming.fullHDVideo,
      this.getElectricityType()
    );
  }

  public getMusicFootprint() {
    return getInternetUsageCarbonImpact(
      this.musicHoursPerDay, // seconds
      streaming.audioMP3,
      this.getElectricityType()
    );
  }

  public getElectricityType(): ElectricityType {
    const lowerCasedCountry = this.country.toLowerCase();
    return (<any>ElectricityType)[lowerCasedCountry];
  }

  public getFoodFootprint(): number {
    return (
      (this.whiteMeatPerWeek / 7) * FoodPortion * food.whiteMeat +
      (this.redMeatPerWeek / 7) * FoodPortion * food.redMeat +
      (this.fishPerWeek / 7) * FoodPortion * food.fish
    );
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    apiKey: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    redMeatPerWeek: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    whiteMeatPerWeek: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    fishPerWeek: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    netflixHoursPerWeek: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    musicHoursPerDay: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    kwhPerMonth: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: database,
  }
);
