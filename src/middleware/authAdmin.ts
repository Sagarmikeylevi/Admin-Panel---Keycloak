import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.KEY_CLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  token = token.split(" ")[1];

  try {
    const decodedToken: JwtPayload = jwt.verify(token, public_key, {
      algorithms: ["RS256"],
    }) as JwtPayload;

    const isAdmin =
      decodedToken.resource_access?.["realm-management"]?.roles.includes(
        "realm-admin"
      );

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
