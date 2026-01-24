import { useState, useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useReward } from "react-rewards";

import AddEntryButton from "../components/Buttons/AddEntryButton.jsx";
import AddFoodModal from "../components/AddFoodModal";
import UpdateFoodModal from "../components/UpdateFoodModal.jsx";
import CircleProgressBar from "../components/CircleProgressBar.jsx";

import { FoodContext } from "../context/FoodContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { totalCalories, calories, percentage } = useContext(FoodContext);
  const { logout } = useContext(AuthContext);

  const { reward: confettiReward } = useReward(
    "confettiReward",
    "confetti"
  );

  useEffect(() => {
    const alreadyCelebrated =
      localStorage.getItem("isPercentageReach") === "true";

    if (percentage === 100 && !alreadyCelebrated) {
      confettiReward();
      localStorage.setItem("isPercentageReach", "true");
    }
  }, [percentage]);

  const navClass = ({ isActive }) =>
    `block px-3 py-2 rounded hover:bg-green-100 ${
      isActive ? "bg-green-100 font-semibold" : ""
    }`;

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg hidden md:flex flex-col z-40">
        <div className="p-6 text-2xl font-bold border-b text-green-700 border-green-600">
          KiloWise
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" end className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/profile" className={navClass}>
            Profile
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            Settings
          </NavLink>
        </nav>

        {percentage === 100 && (
          <div className="text-center text-sm font-semibold text-green-600 mb-2">
            You reached your calorie today!
          </div>
        )}

        {totalCalories > 0 && (
          <div className="flex items-center justify-center flex-col mb-4">
            <CircleProgressBar />
            <div className="text-lg font-semibold">
              {totalCalories}kcal / {calories}kcal
            </div>
          </div>
        )}
      </aside>

      {/* Navbar */}
      <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-30">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm hover:text-red-300 cursor-pointer text-red-500"
        >
          Logout
        </button>
      </header>

      <ToastContainer />

      {/* Page Content */}
      <main className="pt-20 md:ml-64 p-6 min-h-screen flex flex-col overflow-hidden">
        <Outlet context={{ setIsUpdateModalOpen }} />


        <AddEntryButton
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <AddFoodModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <UpdateFoodModal
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
        />

        <span
          id="confettiReward"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-50"
        />
      </main>
    </div>
  );
};

export default Dashboard;
