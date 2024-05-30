import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyAdminToken = (accessToken: string): boolean => {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEY_CLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

  const decodedToken: JwtPayload = jwt.verify(accessToken, publicKey, {
    algorithms: ["RS256"],
  }) as JwtPayload;

  const isAdmin =
    decodedToken.resource_access?.["realm-management"]?.roles.includes(
      "realm-admin"
    );

  return Boolean(isAdmin);
};
