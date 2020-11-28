import { NextFunction, Request, Response } from "express";
import { User } from "./model/user.model";

function abort401(res: Response, err?: Error) {
  res.status(401).json({
    error: err ? err : new Error("Invalid request!"),
  });
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const parsedToken = Buffer.from(token.split(" ")[1], "base64").toString(
        "ascii"
      );
      const [id, key] = parsedToken.split(":");
      const idNumber = Number.parseInt(id);
      const found = await User.findOne({
        where: {
          id: idNumber,
          apiKey: key,
        },
      });
      res.locals.user = found;
      if (!found) {
        throw "Invalid user ID";
      } else {
        next();
      }
    } else {
      throw "Invalid token!";
    }
  } catch (err) {
    abort401(res, err);
  }
};
