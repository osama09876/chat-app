import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await dispatch(registerUser(form)).unwrap();

      toast.success("Account created successfully 🎉");

      setForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-white/20 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-slate-800 text-center">
          Create Account
        </h2>
        <p className="text-slate-500 text-sm text-center mt-2">
          Join chat and start messaging
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-slate-500">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-500">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-500">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
