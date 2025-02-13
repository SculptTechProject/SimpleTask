import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="justify-center">
        <h1 className="text-4xl font-extrabold text-red-400 text-center">
          What a Sigma?
        </h1>
      </header>
      <main>
        <div className="flex justify-center">
          <img
            src="/catRUH.gif"
            alt="Funny cat GIF"
            className="w-64 rounded-lg shadow-lg"
          />
        </div>
        <p className="text-center text-xl py-2 text-emerald-500">
          Go back u little bastard!
        </p>
        <Link
          to="/"
          className="text-center hover:underline text-md hover:text-blue-300 text-blue-500"
        >
          Go home!
        </Link>
      </main>
    </div>
  );
};
