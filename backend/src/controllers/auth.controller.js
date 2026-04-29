import {
  createUserModel,
  findUserByEmail,
  findUserByUsername,
  updateUserModel,
} from "../models/auth.models.js";
import ApiResponse from "../utils/response.util.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const cookieOption = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    if (!username || !email || !password) {
      return ApiResponse.error(res, "All fields are required.", 404);
    }

    const existUser = await findUserByEmail(email);
    const existingUsername = await findUserByUsername(username);
    // console.log(existUser);
    if (existingUsername) {
      return ApiResponse.error(
        res,
        "This username already exist choose different one.",
        404,
      );
    }

    if (existUser) {
      return ApiResponse.error(res, "User already exist", 400);
    }

    let filePath = null;

    if (req.file) {
      filePath = `/uploads/images/${req.file.filename}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserModel(
      username,
      email,
      hashedPassword,
      filePath,
    );

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

const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail) {
      return ApiResponse.error(res, "Username or email is required", 404);
    }
    if (!password) {
      return ApiResponse.error(res, "Password is required", 404);
    }

    if (usernameOrEmail.includes("@")) {
      const user = await findUserByEmail(usernameOrEmail);

      if (!user) {
        return ApiResponse.error(res, "User not found");
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      // console.log(comparePassword);
      if (!comparePassword) {
        return ApiResponse.error(res, "Invalid credentials.");
      }

      const token = jsonwebtoken.sign(
        { id: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "90d" },
      );

      res.status(200).cookie("access-token", token, cookieOption).json({
        status: "success",
        message: "User logged in successfully.",
        user: user,
      });
    } else {
      const user = await findUserByUsername(usernameOrEmail);

      if (!user) {
        return ApiResponse.error(res, "User not found");
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      // console.log(comparePassword);
      if (!comparePassword) {
        return ApiResponse.error(res, "Invalid credentials.");
      }

      const token = jsonwebtoken.sign(
        { id: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "90d" },
      );

      let data = {
        token: token,
      };

      await updateUserModel(user.id, data);

      res.status(200).cookie("access-token", token, cookieOption).json({
        status: "success",
        message: "User logged in successfully.",
        user: user,
      });
    }
  } catch (error) {
    return ApiResponse.error(
      res,
      "Something went wrong while login.",
      500,
      error,
    );
  }
};

const userLogout = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(req);
    

    let data = {
      token: null,
    };

    await updateUserModel(id, data);
    return res.status(200).clearCookie("access-token", cookieOption).json({
      status: "success",
      message: "User logged out successfully.",
    });
  } catch (error) {
    return ApiResponse.error(
      res,
      "Something went wrong while logout.",
      500,
      error,
    );
  }
};

export { registerUser, loginUser, userLogout };
