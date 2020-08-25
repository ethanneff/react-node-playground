import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type UserRefreshToken = { [token: string]: boolean };
type Payload = { userId: string };

const userRefreshToken: UserRefreshToken = {};

const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!userRefreshToken[refreshToken]) return res.sendStatus(403);
  const { err, data } = await verify(refreshToken, "refresh");
  if (err) return res.sendStatus(403);
  const accessToken = generateAccessToken({ userId: data.userId });
  return res.json({ accessToken });
};

const verify = (
  token: string,
  type: "access" | "refresh"
): Promise<{ err: any; data: any }> => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
  const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  return new Promise((resolve) =>
    jwt.verify(token, secret, (err, data) => resolve({ err, data }))
  );
};

const login = (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (userId == null) return res.sendStatus(401);
  const accessToken = generateAccessToken({ userId });
  const refreshToken = generateRefreshToken({ userId });
  userRefreshToken[refreshToken] = true;
  return res.json({ accessToken, refreshToken });
};

const logout = (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  delete userRefreshToken[refreshToken];
  return res.sendStatus(204);
};

const secure = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const { err, data } = await verify(token, "access");
  if (err) return res.sendStatus(403);
  req.userId = data.userId;
  return next();
};

const generateAccessToken = (payload: Payload) => {
  const options = { expiresIn: "20s" };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};

const generateRefreshToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
};

export const Auth = { refresh, login, logout, secure };
