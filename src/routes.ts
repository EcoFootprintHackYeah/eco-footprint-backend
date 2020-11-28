import { Application, Request, Response } from "express";
import authMiddleware from "./authMiddleware";
import { FootprintController } from "./controllers/footprint.controller";
import { IndexController } from "./controllers/index.controller";
import { UsersController } from "./controllers/users.controller";

export class Routes {
  public indexController: IndexController = new IndexController();
  public usersController: UsersController = new UsersController();
  public footprintController: FootprintController = new FootprintController();

  public routes(app: Application) {
    app.route("/api").get(this.indexController.index);
    app.route("/api/user").post(this.usersController.create);
    app
      .route("/api/footprint/base/today")
      .get(authMiddleware, this.footprintController.getDailyBase);
  }
}
