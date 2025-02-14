import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
          I wish i could say more about this <span className="transition-all hover:text-2xl hover:font-extrabold hover:text-red-600">project?</span>
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
      </main>
    </div>
  );
};
