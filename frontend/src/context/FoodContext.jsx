import API from "../api/axios.jsx";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const { calories, token } = useContext(AuthContext);

  // Core state
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedFoodData, setSelectedFoodData] = useState(null);

  // Totals
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  // Progress
  const [percentage, setPercentage] = useState(0);

  /* ================================
     Fetch food data (auth-aware)
     ================================ */
  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const res = await API.get("/food/");
      setFoodData(res.data);
    } catch (err) {
      console.error(
        err.response?.data?.message || "Failed to fetch food data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch foods ONLY after token exists
  useEffect(() => {
    if (!token) {
      setFoodData([]);
      return;
    }
    fetchFoodData();
  }, [token]);

  /* ================================
     Totals calculation
     ================================ */
  useEffect(() => {
    const totals = foodData.reduce(
      (acc, food) => {
        acc.calories += Number(food.calories || 0);
        acc.protein += Number(food.protein || 0);
        acc.carbs += Number(food.carbs || 0);
        acc.fat += Number(food.fat || 0);
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    setTotalCalories(totals.calories);
    setTotalProtein(totals.protein);
    setTotalCarbs(totals.carbs);
    setTotalFat(totals.fat);
  }, [foodData]);

  /* ================================
     Progress calculation
     ================================ */
  useEffect(() => {
    if (!calories || calories <= 0) {
      setPercentage(0);
      return;
    }

    setPercentage(
      Math.min(100, Math.round((totalCalories / calories) * 100))
    );
  }, [totalCalories, calories]);

  /* ================================
     LocalStorage side-effect
     ================================ */
  useEffect(() => {
    if (percentage === 100) {
      localStorage.setItem("isPercentageReach", "true");
    } else {
      localStorage.removeItem("isPercentageReach");
    }
  }, [percentage]);

  /* ================================
     CRUD actions
     ================================ */
  const addFoodData = async (food) => {
    const res = await API.post("/food/", food);
    setFoodData((prev) => [...prev, res.data]);
    return res.data;
  };

  const selectedFood = async (id) => {
    const res = await API.get(`/food/${id}`);
    setSelectedFoodData(res.data);
  };

  const updateFoodData = async (id, data) => {
    setLoading(true);
    try {
      const res = await API.put(`/food/${id}`, data);
      setFoodData((prev) =>
        prev.map((food) =>
          food._id === res.data._id ? res.data : food
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/food/${id}`);
      setFoodData((prev) => prev.filter((food) => food._id !== id));
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     Derived values
     ================================ */
  const caloriesRemaining = Math.max(
    (calories || 0) - totalCalories,
    0
  );

  const isLimitReached = totalCalories >= (calories || 0);

  /* ================================
     Context value
     ================================ */
  return (
    <FoodContext.Provider
      value={{
        foodData,
        isLoading,
        selectedFoodData,
        addFoodData,
        selectedFood,
        updateFoodData,
        deleteFood,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        caloriesRemaining,
        isLimitReached,
        calories,
        percentage,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
