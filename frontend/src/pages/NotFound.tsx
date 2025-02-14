import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <header className="justify-center">
          <h1 className="text-4xl font-extrabold text-center text-red-400">
            <span className="transition-all hover:text-5xl hover:text-red-800">
              What
            </span>{" "}
            <span className="transition-all hover:text-3xl hover:text-red-800">
              a
            </span>{" "}
            <span className="transition-all hover:text-6xl hover:text-emerald-500">
              Sigma
            </span>
            <span className="transition-all hover:text-5xl hover:text-red-800">
              ?
            </span>
          </h1>
        </header>
        <main>
          <div className="flex justify-center">
            <img
              src="/catRUH.gif"
              alt="Funny cat GIF"
              className="w-64 transition-all rounded-lg shadow-lg hover:w-72"
            />
          </div>
          <p className="py-2 text-xl text-center transition-all hover:animate-spin text-emerald-500 hover:py-4">
            Go back u little bastard!
          </p>
          <Link
            to="/"
            className="text-center text-blue-500 transition-all hover:underline text-md hover:text-blue-300 hover:text-2xl"
          >
            Go home plz :)
          </Link>
        </main>
      </div>
    </>
  );
};
