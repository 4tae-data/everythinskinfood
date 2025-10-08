import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-brown-700">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-brown-600 text-white w-full py-2 rounded hover:bg-brown-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
