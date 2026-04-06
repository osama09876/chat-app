import jsonwebtoken from "jsonwebtoken";
import ApiResponse from "../utils/response.util.js";

export const verifyJWT = async (req, res) => {
  const token = req.cookies || req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRETE);

    if (!decoded) {
      return ApiResponse.error(
        res,
        "Unauthorized or expired token",
        401,
        error,
      );
    }

    req.user = decoded; // user id store
    next();
  } catch (error) {
    return ApiResponse.error(res, "Something went wrong", 500, error);
  }
};
