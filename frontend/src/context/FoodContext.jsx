import API from "../api/axios.jsx";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const { calories } = useContext(AuthContext);

  const [foodData, setFoodData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedFoodData, setSelectedFoodData] = useState(null);

  // Totals (base state only)
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  // ✅ Calculate totals whenever foodData changes
  useEffect(() => {
    const caloriesIntake = foodData.reduce(
      (acc, food) => acc + Number(food.calories || 0),
      0,
    );

    const protein = foodData.reduce(
      (acc, food) => acc + Number(food.protein || 0),
      0,
    );

    const carbs = foodData.reduce(
      (acc, food) => acc + Number(food.carbs || 0),
      0,
    );

    const fat = foodData.reduce((acc, food) => acc + Number(food.fat || 0), 0);

    setTotalCalories(caloriesIntake);
    setTotalProtein(protein);
    setTotalCarbs(carbs);
    setTotalFat(fat);
  }, [foodData]);

  // ✅ Derived values (NO STATE)
  const caloriesRemaining = Math.max(calories - totalCalories, 0);
  const isLimitReached = totalCalories >= calories;

  // Fetch foods
  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const res = await API.get("/food/");
      setFoodData(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to fetch food data");
    } finally {
      setLoading(false);
    }
  };

  // Add food
  const addFoodData = async (food) => {
    try {
      const res = await API.post("/food/", food);
      setFoodData((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to submit food data");
      throw err;
    }
  };

  // Select food
  const selectedFood = async (id) => {
    try {
      const res = await API.get(`/food/${id}`);
      setSelectedFoodData(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to fetch food data");
    }
  };

  // Update food
  const updateFoodData = async (id, data) => {
    setLoading(true);
    try {
      const res = await API.put(`/food/${id}`, data);
      setFoodData((prev) =>
        prev.map((food) => (food._id === res.data._id ? res.data : food)),
      );
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to update food data");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/food/${id}`);
      // Remove the deleted food from local state
      setFoodData((prev) => prev.filter((food) => food._id !== id));
    
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to delete food data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <FoodContext.Provider
      value={{
        foodData,
        isLoading,
        addFoodData,
        selectedFood,
        selectedFoodData,
        updateFoodData,
        deleteFood,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        caloriesRemaining,
        isLimitReached,
        calories,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
