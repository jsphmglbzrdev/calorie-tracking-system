import FoodTrackContainer from "./FoodTrackContainer.jsx";
import FoodStatus from "./FoodStatus.jsx";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { FoodContext } from "../context/FoodContext.jsx";

const Main = () => {
  const { foodData } = useContext(FoodContext);
  const { setIsUpdateModalOpen } = useOutletContext();

  return (
    <div className="bg-white rounded-2xl p-2 shadow-2xl mt-4 w-full flex-1 overflow-auto thin-scrollbar">
      <FoodStatus />
      <FoodTrackContainer setIsUpdateModalOpen={setIsUpdateModalOpen} />

      {foodData.length === 0 && (
        <div className="text-gray-600 flex items-center flex-col justify-center h-full">
          <div className="text-lg">
            There is no food data to render.
          </div>
          <span className="text-sm">
            Start tracking your calories by clicking the add entry button.
          </span>
        </div>
      )}
    </div>
  );
};

export default Main;
