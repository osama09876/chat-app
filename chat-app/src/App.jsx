import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatAppDasboard from "./pages/ChatAppDasboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatAppDasboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
