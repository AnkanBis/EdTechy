import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user: {
    email?: string;
    id?: string;
    role?: string;
  };
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const authReq = req as AuthRequest;

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({
      message: "Authorization Header missing",
    });
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  try {
    const decodedValue = jwt.verify(
      token,
      String(process.env.SECRET_KEY)
    ) as JwtPayload;

    // console.log(decodedValue);

    authReq.user = authReq.user || {};

    authReq.user.id = decodedValue.id;
    authReq.user.email = decodedValue.email;
    authReq.user.role = decodedValue.role;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
