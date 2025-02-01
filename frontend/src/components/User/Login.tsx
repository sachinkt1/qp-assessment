// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login: React.FC = ({API_URL}) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, credentials);
      Swal.fire("Success", "Login successful!", "success");
      console.log("Logged in: ", response.data);

      // Store user data in local storage or context
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error", "Login failed!", "error");
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
