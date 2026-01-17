import Main from "../components/Main";
import AddEntryButton from "../components/Buttons/AddEntryButton.jsx";
import { useState } from "react";
import AddFoodModal from "../components/AddFoodModal";
import { ToastContainer } from "react-toastify";
import UpdateFoodModal from "../components/UpdateFoodModal.jsx";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-200">
      
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg hidden md:flex flex-col z-40">
        <div className="p-6 text-2xl font-bold border-b text-green-700 border-green-600">
          KiloWise
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a className="block px-3 py-2 rounded hover:bg-green-100">Dashboard</a>
          <a className="block px-3 py-2 rounded hover:bg-green-100">Profile</a>
          <a className="block px-3 py-2 rounded hover:bg-green-100">Settings</a>
        </nav>
      </aside>

      {/* Navbar */}
      <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-30">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button className="text-sm text-red-500">Logout</button>
      </header>

      <ToastContainer />

      {/* Main Content */}
      <main className="pt-20 md:ml-64 p-6 min-h-screen overflow-y-auto">
        <Main setIsUpdateModalOpen={setIsUpdateModalOpen}/>
        <AddEntryButton
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <AddFoodModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
				<UpdateFoodModal isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen}/>
      </main>

    </div>
  );
};

export default Dashboard;
