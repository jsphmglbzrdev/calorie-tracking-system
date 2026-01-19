import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FoodContext } from "../context/FoodContext.jsx";
import { ChevronDown } from "lucide-react";

const FoodStatus = () => {
	const [isShow, setShow] = useState(false);
	const {	
				totalCalories,
				totalProtein,
				totalCarbs,
				totalFat,
				calories,
				caloriesRemaining,
				isLimitReached} = useContext(FoodContext);



  const foodStatus = [
    { label: "Target Calories", value: calories },
    { label: "Calories Consumed", value: totalCalories },
    { label: "Protein", value: `${totalProtein} g` },
    { label: "Carbs", value: `${totalCarbs} g` },
    { label: "Fat", value: `${totalFat} g` },
    { label: "Calories Remaining", value: caloriesRemaining },
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
        {/* Warning when limit is reached */}
        {isLimitReached && (
          <div className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">
            ⚠️ Daily calorie limit reached
          </div>
        )}

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
