import {
  electricity,
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
    const electricityPrice = (<any>electricity)[this.country];
    const electricityType: ElectricityType = (<any>ElectricityType)[
      this.country
    ];
    // electricity.
    const electricalFootprint = electricityPrice * (this.kwhPerMonth / 30);

    const streamingFootprint = getInternetUsageCarbonImpact(
      (this.netflixHoursPerWeek / 7) * 3600, // seconds
      streaming.fullHDVideo,
      electricityType
    );

    const musicFootprint = getInternetUsageCarbonImpact(
      this.musicHoursPerDay, // seconds
      streaming.audioMP3,
      electricityType
    );

    const foodFootprint =
      (this.whiteMeatPerWeek / 7) * FoodPortion * food.whiteMeat +
      (this.redMeatPerWeek / 7) * FoodPortion * food.redMeat +
      (this.fishPerWeek / 7) * FoodPortion * food.fish;
    return (
      electricalFootprint + musicFootprint + streamingFootprint + foodFootprint
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
      type: new STRING(32),
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
      type: DataTypes.ENUM(...AllowedCountries),
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
