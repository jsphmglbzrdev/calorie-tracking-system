import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import LoadingSpinner from "./LoadingSpinner";

const FoodTrackContainer = ({ setIsUpdateModalOpen }) => {
  const { foodData, isLoading, selectedFood } = useContext(FoodContext);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {foodData.map((food) => (
        <div
          key={food._id}
          onClick={() => {
            selectedFood(food._id);
            setIsUpdateModalOpen(true);
          }}
          className="bg-white cursor-pointer rounded-xl shadow-md border border-green-200 p-5 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            {food.foodName}
          </h3>
          <p>Calories: {food.calories}</p>
          <p>Protein: {food.protein}g</p>
          <p>Carbs: {food.carbs}g</p>
          <p>Fat: {food.fat}g</p>
        </div>
      ))}
    </div>
  );
};


export default FoodTrackContainer;
