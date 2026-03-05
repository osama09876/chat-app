import {
  createUserModel,
  findUserByEmail,
} from "../models/auth.models.js";
import ApiResponse from "../utils/response.util.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return ApiResponse.error(res, "All fields are required.", 404);
    }

    const existUser = await findUserByEmail(email);

    if (existUser) {
      return ApiResponse.error(res, "User already exist", 400);
    }

    let filePath = null;
    const file = req.file?.avatar;

    if (req.file) {
      filePath = `/uploads/images/${file.filename}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = createUserModel(username, email, hashedPassword, filePath);

    if (!user) {
      return ApiResponse.error(res, "Something went while creating user.", 400);
    }

    return ApiResponse.success(res, "User created successfully", user, 201);
  } catch (error) {
    return ApiResponse.error(
      res,
      "Something went while register user.",
      500,
      error,
    );
  }
};

export { registerUser };
