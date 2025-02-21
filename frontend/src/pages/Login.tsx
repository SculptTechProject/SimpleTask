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
          <div className="relative group">
            <Link to="/" className="text-sm text-gray-500 transition-all hover:text-3xl hover:text-gray-700">Go back to home?</Link>
            <img
              src="catBed.gif"
              alt="Hover GIF"
              className="absolute h-auto mt-2 transition-opacity duration-300 transform -translate-x-1/2 shadow-md opacity-0 bottom-full left-1/2 group-hover:opacity-100 hover:rotate-180 rounded-xl"
            />
          </div>
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
                className="mb-4 text-gray-700 transition-all border rounded-md hover:px-5 hover:py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mb-4 text-gray-700 transition-all border rounded-md hover:py-2 hover:px-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 font-bold text-white transition-all bg-orange-400 border rounded-lg hover:text-orange-200 hover:bg-sky-500 hover:px-6 hover:py-4"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
            <div className="flex justify-center">
              <img
                src="/catKiss.gif"
                alt="Funny cat GIF"
                className="w-64 transition-all rounded-lg shadow-lg hover:px-5 hover:py-5 hover:w-96"
              />
            </div>
            <div className="text-center">
              <p>
                Do not have an account?{" "}
                <span className="transition-all hover:font-bold hover:text-2xl text-slate-600">
                  lol
                </span>
              </p>
              <Link
                to="/register"
                className="transition-all hover:outline-gray-600 hover:py-1 hover:px-20 hover:bg-emerald-200 hover:text-slate-500 shadow=lg hover:text-xl"
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
