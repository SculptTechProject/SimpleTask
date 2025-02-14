import { useState } from "react";
import { loginUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

export const Login = () => {
  interface LoginResponse {
    token: string;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);

      const data = response.data as LoginResponse;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <div>
          <HashLoader color="#fb923c" />
        </div>
      )}
      {!loading && (
        <>
          <header className="text-2xl font-bold text-gray-500">Login</header>
          <main>
            <div className="text-red-500">{error}</div>
            <form className="flex flex-col pb-4" onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-gray-500">
                email
              </label>
              <input
                type="text"
                id="email"
                className="mb-4 text-gray-700 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mb-4 text-gray-700 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 font-bold text-white transition-all bg-orange-400 border rounded-lg hover:text-orange-200 hover:bg-sky-500"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
            <div className="flex justify-center">
              <img
                src="/catKiss.gif"
                alt="Funny cat GIF"
                className="w-64 rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center">
              <p>Do not have an account? lol</p>
              <Link
                to="/register"
                className="transition-all hover:outline-teal-600 hover:py-1 hover:px-12 hover:bg-emerald-200 hover:text-slate-500"
              >
                Register!
              </Link>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
