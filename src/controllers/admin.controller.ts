import { Request, Response } from "express";
import { keycloakAdmin, keycloakConfig } from "../utils/keycloak.js";
import axios from "axios";
import { verifyAdminToken } from "../utils/verifyAdminToken.js";

export const adminSession = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await keycloakAdmin.auth({
      grantType: "password",
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
      username: username,
      password: password,
    });

    const token = keycloakAdmin.accessToken;

    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const isAdmin: boolean = verifyAdminToken(token);

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(token);
  } catch (error) {
    console.error("Failed to login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};
