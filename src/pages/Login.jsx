import { useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://job-tracker-backend-gf6p.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-bold">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
