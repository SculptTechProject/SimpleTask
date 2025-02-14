import { useNavigate } from "react-router-dom";

export const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 font-bold text-white transition-all bg-red-500 rounded hover:bg-red-600 hover:px-6 hover:py-4"
    >
      Logout
    </button>
  );
};
