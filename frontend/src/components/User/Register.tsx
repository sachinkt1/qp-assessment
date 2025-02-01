// Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register: React.FC = ({API_URL}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, formData);
      Swal.fire("Success", "Registration successful!", "success");
      console.log("Registered: ", response.data);

      // Store user data in local storage or context
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error", "Registration failed!", "error");
      console.error("Registration error: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <select name="role" onChange={handleChange} required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
