import { useState } from "react";
import { registerUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

export const Register = () => {
  interface RegisterResponse {
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

    // Sprawdzenie, czy email i hasło są podane
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      setLoading(false);
      return;
    }

    try {
      console.log("Wysyłanie danych:", { email, password });

      const response = await registerUser(email, password);
      console.log("Odpowiedź serwera:", response.data);

      const data = response.data as RegisterResponse;

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Błąd rejestracji:", error.response?.data || error.message);

      setError(
        error.response?.data?.error || "Registration failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <div>
          <HashLoader color="#fb923c" />
        </div>
      ) : (
        <>
          <div className="relative group">
            <Link
              to="/"
              className="text-sm text-gray-500 transition-all hover:text-3xl hover:text-gray-700"
            >
              Go back to home?
            </Link>
            <img
              src="catBed.gif"
              alt="Hover GIF"
              className="absolute h-auto mt-2 transition-opacity duration-300 transform -translate-x-1/2 shadow-md opacity-0 bottom-full left-1/2 group-hover:opacity-100 hover:rotate-180 rounded-xl"
            />
          </div>
          <header className="text-2xl font-bold text-gray-500">Register</header>
          <main>
            {error && <div className="text-center text-red-500">{error}</div>}
            <form className="flex flex-col pb-4" onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-gray-500">
                Email
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
                className="mb-4 text-gray-700 transition-all border rounded-md hover:px-5 hover:py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 font-bold text-white transition-all bg-orange-400 border rounded-lg hover:text-orange-200 hover:bg-sky-500 hover:px-6 hover:py-4"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="flex justify-center">
              <img
                src="/catMoney.gif"
                alt="Funny cat GIF"
                className="w-64 transition-all rounded-lg shadow-lg hover:px-5 hover:py-5 hover:w-96"
              />
            </div>
            <div className="text-center">
              <p>
                Already have an account?{" "}
                <span className="transition-all hover:font-bold hover:text-red-600 hover:text-2xl">
                  What
                </span>{" "}
                <span className="transition-all hover:text-red-600 hover:font-bold hover:text-3xl">
                  u
                </span>{" "}
                <span className="transition-all hover:text-green-600 hover:font-bold hover:text-4xl">
                  doin
                </span>{" "}
                <span className="transition-all hover:text-red-600 hover:font-bold hover:text-3xl">
                  here?
                </span>
              </p>
              <Link
                to="/login"
                className="transition-all hover:outline-gray-600 hover:py-1 hover:px-20 hover:bg-emerald-200 hover:text-slate-500 shadow=lg hover:text-xl"
              >
                Login!
              </Link>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
