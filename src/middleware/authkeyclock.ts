import { Request, Response, NextFunction } from "express";
import { keycloakAdmin, keycloakConfig } from "../utils/keycloak.js";

export const authenticateKeycloakAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await keycloakAdmin.auth({
      grantType: "client_credentials",
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
    });

    next();
  } catch (error) {
    console.error("Failed to authenticate with Keycloak:", error);
    res.status(500).json({ error: "Failed to authenticate with Keycloak" });
  }
};
