import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import LoadingSpinner from "./LoadingSpinner";
import {useEffect} from 'react';
const FoodTrackContainer = () => {
  const { foodData, isLoading, fetchFoodData} = useContext(FoodContext);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {foodData.length === 0 ? (
        <p className="text-center absolute inset-0 text-gray-500 flex items-center justify-center">
          No food data available. Start by adding some food!
        </p>
      ) : (
        foodData.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-xl shadow-md border border-green-200 p-5 
                 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Food Name */}
            <h3 className="text-lg font-semibold text-green-700 mb-3 capitalize">
              {food.foodName}
            </h3>

            {/* Nutrition Info */}
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium">Calories:</span> {food.calories}
              </p>
              <p>
                <span className="font-medium">Protein:</span> {food.protein}g
              </p>
              <p>
                <span className="font-medium">Carbs:</span> {food.carbs}g
              </p>
              <p>
                <span className="font-medium">Fat:</span> {food.fat}g
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FoodTrackContainer;
