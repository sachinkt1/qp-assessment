import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import Register from "./components/User/Register.tsx";
import Login from "./components/User/Login.tsx";

const App: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isRegistered = user?.isRegistered;
  const API_URL = 'http://localhost:9000'
  return (
    <Router>
      <Routes>
        {/* Redirect to register page if no user exists */}
        <Route path="/register" element={!user ? <Register API_URL={API_URL} /> : <Navigate to={user.role === "admin" ? "/admin" : "/"} />} />

        {/* If user logs out, show login page */}
        <Route path="/login" element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/"} /> : <Login API_URL={API_URL} />} />

        {/* Protected admin route */}
        <Route path="/admin" element={user && user.role === "admin" ? <AdminPage API_URL={API_URL} /> : <Navigate to="/register" />} />

        {/* Default route for users */}
        <Route path="/" element={user ? <UserPage API_URL={API_URL} /> : <Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;
