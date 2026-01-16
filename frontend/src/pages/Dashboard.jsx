import Navbar from "../components/Navbar";
import Main from "../components/Main";
import AddFoodModal from "../components/AddFoodModal";
import { useState } from "react";

const Dashboard = () => {
	
	const [isShow, setShow] = useState(false);

  return (
    <div className="bg-gray-200 w-full h-full">
			<div className="m-auto max-w-4xl p-4">
	
				<Navbar/>
				<Main/>
				<div className="fixed bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-md cursor-pointer py-2 px-4 text-white right-5 bottom-5">
					<button onClick={() => setShow(!isShow)} className="cursor-pointer text-sm">Add Entry</button>
				</div>

				{isShow && <AddFoodModal setShow={setShow} isShow={isShow}/>}
			</div>
    </div>
  );
};

export default Dashboard;
