import { Application, Request, Response } from "express";
import { IndexController } from "./controllers/index.controller";

export class Routes {
  public nodesController: IndexController = new IndexController();

  public routes(app: Application) {
    app.route("/").get(this.nodesController.index);
    app.route("/nodes").get(this.nodesController.index);
  }
}
