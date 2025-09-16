import { validateUserToken } from "../utils/token.js";

export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers("authorization");

  if (!authHeader) return next();

  if (!authHeader.startsWith("Bearer"))
    return res
      .status(400)
      .json({ error: "Authorization header must start with Bearer" });

  const [_, token] = authHeader.split(" "); // Bearer , <Token>
  const payload = validateUserToken(token);
  req.paylod = payload;
  next();
}

export function ensureAuthencaticated(req, res, next) {
  if (!req.user || !res.user.id) {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this resourse" });
  }
  next();
}
