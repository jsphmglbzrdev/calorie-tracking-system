import API from "../api/axios.jsx";
import { useState, useEffect, createContext } from "react";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setLoading] = useState(true); // page load only
  const [selectedFoodData, setSelectedFoodData] = useState(null);

  // Fetch all foods (page load)
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

  // Add food and update UI instantly
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

  // Select food (NO loading state)
  const selectedFood = async(food) => {
		try{
			const res = await API.get(`/food/${food}`);
			console.log("Selected food data from API:", res.data);
			setSelectedFoodData(res.data);
		}catch(err){
			console.log(err.response?.data?.message || "Failed to fetch selected food data");
		}
    
  };

	const updateFoodData = async(food, data) => {
		setLoading(true)
		try{
			const res = await API.put(`/food/${food}`, data);
			console.log("Updated data: ", res.data);
			setFoodData(prev => prev.map(food => food._id === res.data._id ? res.data : food))
		}catch(err){
			console.log(err.response?.data?.message || "Failed to update food data");
		}finally{
			setLoading(false)
		}
	}

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
				updateFoodData
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
