import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from "../features/auth/authSelectors";
import { loginUser } from "../features/auth/authSlice";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await dispatch(
        loginUser({
          usernameOrEmail: emailOrUsername,
          password,
        }),
      ).unwrap();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="text-gray-500 mt-2">Login to continue chatting</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-sm cursor-pointer text-gray-500"
              >
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {error && <p>{error}</p>}

          {/* Divider */}
          <div className="text-center text-gray-400 text-sm">or</div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
