import jsonwebtoken from "jsonwebtoken";
import ApiResponse from "../utils/response.util.js";

export const verifyJWT = (req, res, next) => {
  try {
    let token;

    // 1. From cookies
    if (req.cookies && req.cookies["access-token"]) {
      token = req.cookies["access-token"];
    }

    // 2. From Authorization header
    else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Bearer TOKEN
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET, // fix typo here too
    );

    req.user = decoded;
    next();
  } catch (error) {
    return ApiResponse.error(res, "Invalid or expired token", 401, error);
  }
};
