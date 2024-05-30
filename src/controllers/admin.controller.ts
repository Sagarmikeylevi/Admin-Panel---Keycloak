import { Request, Response } from "express";
import { keycloakConfig } from "../utils/keycloak.js";
import axios from "axios";
import { verifyAdminToken } from "../utils/verifyAdminToken.js";

export const adminSession = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realmName}/protocol/openid-connect/token`,
      {
        grant_type: "password",
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const isAdmin: boolean = verifyAdminToken(response.data.access_token);

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};
