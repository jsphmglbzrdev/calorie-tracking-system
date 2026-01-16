import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FoodContext } from "../context/FoodContext.jsx";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FoodStatus = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [calRemaining, setCalRemaining] = useState(0);
  const [isShow, setShow] = useState(false);

  const { calories } = useContext(AuthContext);
  const { foodData } = useContext(FoodContext);

  const calculateIntake = () => {
    const calories = foodData.reduce((acc, food) => acc + food.calories, 0);
    const protein = foodData.reduce((acc, food) => acc + food.protein, 0);
    const carbs = foodData.reduce((acc, food) => acc + food.carbs, 0);
    const fat = foodData.reduce((acc, food) => acc + food.fat, 0);

    setTotalCalories(calories);
    setTotalProtein(protein);
    setTotalCarbs(carbs);
    setTotalFat(fat);
  };

  const remainingCal = () => {
    const remaining = calories - totalCalories;
    setCalRemaining(remaining);
  };

  useEffect(() => {
    calculateIntake();
    remainingCal();
  }, [foodData]);

  const foodStatus = [
    {
      label: "Target Calories",
      value: calories,
    },
    {
      label: "Calories Consumed",
      value: totalCalories,
    },
    {
      label: "Protein",
      value: totalProtein,
    },
    {
      label: "Carbs",
      value: totalCarbs,
    },
    {
      label: "Fat",
      value: totalFat,
    },
    {
      label: "Calories Remaining",
      value: calRemaining,
    },
  ];

  return (
    <div className="mb-6 p-4 bg-green-100 rounded-lg shadow-md relative">
      <ChevronDown
        onClick={() => setShow(!isShow)}
				size={16}
        strokeWidth={1}
        className={`cursor-pointer transform transition-transform duration-200 absolute right-2 top-2 ${
          isShow ? "rotate-180" : "rotate-0"
        }`}
      />

      {/* Dropdown content */}
      <div
        className={`
      overflow-hidden transition-all duration-500 ease-in-out
      ${isShow ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"}
    `}
      >
        {foodStatus.map((status, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div className="text-lg font-semibold">{status.label}:</div>
            <div>{status.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodStatus;
