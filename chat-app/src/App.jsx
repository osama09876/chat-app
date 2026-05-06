import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatAppDasboard from "./pages/ChatAppDasboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatAppDasboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
