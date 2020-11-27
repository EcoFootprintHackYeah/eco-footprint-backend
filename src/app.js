"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
// load the environment variables from the .env file
dotenv_1.default.config({
    path: ".env",
});
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
    }
    return Server;
}());
// initialize server app
var server = new Server();
// make server listen on some port
(function (port) {
    if (port === void 0) { port = process.env.APP_PORT || 5000; }
    server.app.listen(port, function () { return console.log("> Listening on port " + port); });
})();
