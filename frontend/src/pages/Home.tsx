import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="justify-center">
        <h1 className="text-center font-bold text-3xl text-gray-600">
          Simple task
        </h1>
        <nav className="py-3 mx-6 my-3 text-sky-700 text-xl font-semibold">
          <ul className="flex flex-row gap-6 justify-center">
            <li>
              <Link
                to="/login"
                className="hover:underline hover:text-sky-400 transition-all"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:underline hover:text-sky-400 transition-all"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline hover:text-sky-400 transition-all"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2 className="text-center justify-center align-middle text-md text-emerald-800">
          I wish i could say more about this project?
        </h2>
        <p className="text-center justify-center align-middle text-md text-emerald-800 pt-8">
          me rn:
        </p>
        <div className="flex justify-center">
          <img
            src="/catTyping.gif"
            alt="Funny cat GIF"
            className="w-64 rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  );
};
