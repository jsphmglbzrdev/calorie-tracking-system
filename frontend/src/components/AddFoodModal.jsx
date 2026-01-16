import { useState, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import {FoodContext} from "../context/FoodContext";

export default function AddFoodModal({ isShow, setShow }) {

	const { addFoodData, isLoading } = useContext(FoodContext);


  const [form, setForm] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addFoodData(form);
      setForm({
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
			setShow(!isShow);
			
      console.log("Food added successfully");
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to add food");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 opacity-100">
      {/* Modal */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
				{isLoading && <LoadingSpinner/>}
        <h2 className="mb-4 text-xl font-semibold text-center">
          Track your food intake!
        </h2>
        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="Food Name"
              className="text-sm font-semibold text-gray-500"
            >
              Food Name
            </label>
            <input
              required
              type="text"
              value={form.foodName}
              onChange={(e) => setForm({ ...form, foodName: e.target.value })}
              className="border focus:outline-green-700 border-gray-400 rounded-md py-2 pl-2"
            />
          </div>

          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="Calories Count"
              className="text-sm font-semibold text-gray-500"
            >
              Calories
            </label>
            <input
              required
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
              type="number"
              className="border focus:outline-green-700 border-gray-400 rounded-md py-2 pl-2"
            />
          </div>

          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="Protein"
              className="text-sm font-semibold text-gray-500"
            >
              Protein
            </label>
            <input
              required
              value={form.protein}
              onChange={(e) => setForm({ ...form, protein: e.target.value })}
              type="number"
              className="border focus:outline-green-700 border-gray-400 rounded-md py-2 pl-2"
            />
          </div>

          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="Carbs"
              className="text-sm font-semibold text-gray-500"
            >
              Carbs
            </label>
            <input
              required
              value={form.carbs}
              onChange={(e) => setForm({ ...form, carbs: e.target.value })}
              type="number"
              className="border focus:outline-green-700 border-gray-400 rounded-md py-2 pl-2"
            />
          </div>

          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="Fat"
              className="text-sm font-semibold text-gray-500"
            >
              Fat
            </label>
            <input
              required
              value={form.fat}
              onChange={(e) => setForm({ ...form, fat: e.target.value })}
              type="number"
              className="border focus:outline-green-700 border-gray-400 rounded-md py-2 pl-2"
            />
          </div>

          <div className="mt-6 flex gap-3">
            {/* Cancel */}
            <button
              type="button"
              className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setShow(!isShow)}
            >
              Cancel
            </button>

            {/* Add */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md 
							bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
