import { verifyToken } from "../configs/jwt.js";
import User from "../models/User.model.js";

/* Bearer Token Extractor */

const extractToken = (req) => {
  const token =
    req.cookies.token ||
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers.token;

  if (token && token.startsWith("Bearer ")) {
    return token.split(" ")[1];
  }

  return token;
};

/* Middleware Function isAuthenticate */

export const isAuthenticate = async (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
  try {
    const decoded = verifyToken(token);
    if (!decoded || decoded === null) {
      return res
        .status(401)
        .json({ success: false, message: " Unauthorized " });
    }

    const user = await User.findById(decoded.id).select({
      "-password": true,
      "-confirmPassword": true,
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found or Unauthorized" });
    }
    req.user = user;
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }

  next();
};
