import { useState, useContext, useEffect } from "react";
import { FoodContext } from "../context/FoodContext.jsx";
import { toast } from "react-toastify";

export default function UpdateFoodModal({ isUpdateModalOpen, setIsUpdateModalOpen }) {
  const { selectedFoodData, updateFoodData, isLoading } = useContext(FoodContext);
	
  const [form, setForm] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  // Populate form when a food is selected
  useEffect(() => {
    if (selectedFoodData) {
      setForm({
				id: selectedFoodData._id,
        foodName: selectedFoodData.foodName || "",
        calories: selectedFoodData.calories || "",
        protein: selectedFoodData.protein || "",
        carbs: selectedFoodData.carbs || "",
        fat: selectedFoodData.fat || "",
      });
    }
  }, [selectedFoodData]);

  if (!isUpdateModalOpen || !selectedFoodData) return null;
	
	

  const submitHandler = (e) => {
		
    e.preventDefault();
    toast("Food updated successfully!");
		updateFoodData(form.id, form)
    setIsUpdateModalOpen(false);
  };

	if(isLoading) return <LoadingSpinner/>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-center">
          Update Food Entry
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {[
            ["Food Name", "foodName", "text"],
            ["Calories", "calories", "number"],
            ["Protein", "protein", "number"],
            ["Carbs", "carbs", "number"],
            ["Fat", "fat", "number"],
          ].map(([label, key, type]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500">
                {label}
              </label>
              <input
                required
                type={type}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="border focus:outline-green-700 border-gray-400 rounded-md py-2 pl-2"
              />
            </div>
          ))}

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="w-full cursor-pointer rounded-md border border-gray-300 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
