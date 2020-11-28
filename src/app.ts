import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Routes } from "./routes";

// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

// initialize server app
const server = new Server();

// make server listen on some port
((port = process.env.APP_PORT || 3000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
