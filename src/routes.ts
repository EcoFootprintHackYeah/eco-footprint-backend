import { Application, Request, Response } from "express";
import authMiddleware from "./authMiddleware";
import { FootprintController } from "./controllers/footprint.controller";
import { IndexController } from "./controllers/index.controller";
import { UsersController } from "./controllers/users.controller";
import { AdvicesController } from "./controllers/advices.controller";
import { HistoricalDataController } from "./controllers/historicaldata.controller";

export class Routes {
  public indexController: IndexController = new IndexController();
  public usersController: UsersController = new UsersController();
  public footprintController: FootprintController = new FootprintController();
  public advicesController: AdvicesController = new AdvicesController();
  public historicalController: HistoricalDataController = new HistoricalDataController();

  public routes(app: Application) {
    app.route("/api").get(this.indexController.index);
    app.route("/api/user").post(this.usersController.create);
    app
      .route("/api/footprint/base/today")
      .get(authMiddleware, this.footprintController.getDailyBase);
    app
      .route("/api/footprint/trip")
      .post(authMiddleware, this.footprintController.addTrip);
    app
      .route("/api/footprint/monthly")
      .get(authMiddleware, this.footprintController.getMonthlyFootprint);
    app
      .route("/api/footprint/trip")
      .patch(authMiddleware, this.footprintController.updateTrip);
    app
      .route("/api/footprint/trips")
      .get(authMiddleware, this.footprintController.getTrips);
    app
      .route("/api/footprint/monthly/grouped")
      .get(authMiddleware, this.footprintController.getGroupedMonthlyData);
    app
      .route("/api/advices/today")
      .get(authMiddleware, this.advicesController.getDailyAdvice);

    app
      .route("/api/historicalData")
      .get(authMiddleware, this.historicalController.getData);
  }
}
