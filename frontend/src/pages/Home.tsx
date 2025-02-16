import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginFamily } from "../api/api";
import { HashLoader } from "react-spinners";

export const Home = () => {
  interface LoginFamilyResponse {
    token: string;
  }

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginFamily(code);

      const data = response.data as LoginFamilyResponse;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : String(err));
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
          <header className="justify-center">
            <h1 className="text-3xl font-bold text-center text-gray-600">
              Simple task
            </h1>
            <nav className="py-3 mx-6 my-3 text-xl font-semibold text-sky-700">
              <ul className="flex flex-row justify-center gap-6">
                <li>
                  <Link
                    to="/login"
                    className="transition-all hover:underline hover:text-sky-400"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="transition-all hover:underline hover:text-sky-400"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="transition-all hover:underline hover:text-sky-400"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <h2 className="justify-center text-center align-middle text-md text-emerald-800">
              I wish i could say more about this{" "}
              <span className="transition-all hover:text-2xl hover:font-extrabold hover:text-red-600">
                project?
              </span>
            </h2>
            <p className="justify-center pt-8 text-center align-middle text-md text-emerald-800">
              me rn:
            </p>
            <div className="flex justify-center">
              <img
                src="/catTyping.gif"
                alt="Funny cat GIF"
                className="w-64 transition-all rounded-lg shadow-lg hover:w-72"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full pt-8">
              <div className="mb-4 font-bold text-center text-red-500">
                {error}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-xs"
              >
                <label htmlFor="code" className="mb-1 text-gray-500 transition-all text-md hover:text-xl hover:text-orange-400">
                  Code:
                </label>
                <input
                  type="number"
                  id="code"
                  className="px-3 py-2 mb-4 text-gray-700 transition-all border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 hover:px-5 hover:py-4"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 font-bold text-white transition-all bg-orange-400 border rounded-lg hover:bg-sky-500 hover:px-6 hover:py-4"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
