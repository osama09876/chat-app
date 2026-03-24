import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatAppDasboard from "./pages/ChatAppDasboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard/:name" element={<ChatAppDasboard />} />
    </Routes>
  );
}

export default App;
