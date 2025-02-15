import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HashLoader } from "react-spinners";
import { LogoutBtn } from "../components/LogoutBtn";

interface TokenPayload {
  userId: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
}

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async (userId: string | null, token: string | null) => {
    try {
      const response = await axios.get(
        `https://simple-task-backend.vercel.app/api/v1/tasks?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data as Task[]);
    } catch (error) {
      console.error("Błąd podczas pobierania tasków", error);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      const token = localStorage.getItem("token");
      let userId: string | null = null;
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        userId = decoded.userId;
      }
      await fetchTasks(userId, token);
      setLoading(false);
    };
    initFetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let userId: string | null = null;
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      userId = decoded.userId;
    }
    try {
      await axios.post(
        "https://simple-task-backend.vercel.app/api/v1/tasks",
        { title, description, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      await fetchTasks(userId, token);
    } catch (error) {
      console.error("Błąd podczas dodawania taska", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    let userId: string | null = null;
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      userId = decoded.userId;
    }
    try {
      await axios.delete(
        `https://simple-task-backend.vercel.app/api/v1/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchTasks(userId, token);
    } catch (error) {
      console.error("Błąd podczas usuwania taska", error);
    }
  };

  const handleEditTask = async (id: string) => {
    const token = localStorage.getItem("token");
    let userId: string | null = null;
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      userId = decoded.userId;
    }
    const newTitle = prompt("Podaj nowy tytuł:");
    const newDescription = prompt("Podaj nowy opis:");
    if (!newTitle) return;
    try {
      await axios.put(
        `https://simple-task-backend.vercel.app/api/v1/tasks/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTasks(userId, token);
    } catch (error) {
      console.error("Błąd podczas edytowania taska", error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <HashLoader color="#fb923c" />
      </div>
    );

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="flex justify-center pt-5">
        <LogoutBtn />
      </div>
      <header>
        <h1 className="py-8 text-3xl font-bold text-center text-gray-600">
          Dashboard
        </h1>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Add new task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 transition-all border rounded hover:px-5 hover:py-4"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 transition-all border rounded hover:px-5 hover:py-4"
            />
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white transition-all bg-orange-400 rounded hover:bg-orange-200 hover:text-gray-500 hover:px-6 hover:py-4"
            >
              Add Task
            </button>
          </form>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold">Your task's</h2>
          <div className="flex flex-col gap-4">
            {tasks.length === 0 ? (
              <div className="relative group">
                <p className="py-4 text-center transition-all hover:mt-3 hover:outline-dotted">
                  Nothing's here! Add task! *do not hover on me*
                </p>
                <img
                  src="catTwerk.gif"
                  alt="Hover GIF"
                  className="absolute h-auto mt-2 transition-opacity duration-300 transform -translate-x-1/2 shadow-md opacity-0 top-full left-1/2 group-hover:opacity-100 hover:rotate-180 rounded-xl"
                />
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 text-center transition-all border rounded hover:py-5"
                >
                  <h3 className="text-xl">{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="flex justify-center gap-2 mt-2 transition-all hover:mt-5">
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="px-2 py-1 text-white transition-all bg-blue-500 rounded hover:bg-blue-600 hover:px-4 hover:py-3"
                    >
                      Edite
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-2 py-1 text-white transition-all bg-red-500 rounded hover:bg-red-600 hover:px-4 hover:py-3"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
