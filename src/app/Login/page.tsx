"use client";
import React, { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Ikon untuk password

const LoginForm: React.FC = () => {
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State pesan error

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message sebelum melakukan login
    try {
      const response = await axiosInstance.post("/auth/login", {
        nis,
        katasandi: password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      window.history.back(); // Navigasi kembali setelah berhasil login
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed, please check your NIS and password."); // Menampilkan pesan error
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md opacity-90"
      >
        {/* Bagian Ikon Gambar di atas tulisan "Login" */}
        <div className="flex justify-center mb-4">
          <img
            src="/android-chrome-192x192.png" // Gambar yang berada di folder public/images
            alt="Login Icon"
            className="w-16 h-16" // Menyesuaikan ukuran gambar
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>

        {/* Menampilkan pesan error jika ada */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            NIS
          </label>
          <input
            type="text"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            placeholder="Masukan NIS Anda"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white pr-10"
              placeholder="Masukan Kata Sandi"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl" />
              ) : (
                <AiOutlineEye className="text-xl" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
