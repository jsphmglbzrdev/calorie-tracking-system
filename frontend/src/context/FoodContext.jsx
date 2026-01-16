import API from "../api/axios.jsx";
import { useState, useEffect, createContext } from "react";


export const FoodContext = createContext();

export const FoodProvider = ({children}) => {

	const [foodData, setFoodData] = useState([]);
	const [isLoading, setLoading] = useState(false);

  const fetchFoodData = async () => {
		setLoading(true);
    try {
      const res = await API.get("/food/");
      setFoodData(res.data);
			setLoading(false);

      console.log("Food data fetched successfully");
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to fetch food data");
    }
  };

	const addFoodData = async(food) =>{
		setLoading(true);
    try {
      const res = await API.post("/food/", food);
      setFoodData((prev) => [...prev, res.data]);

			setLoading(false);

      console.log("Food data sent successfully");
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to submit food data");
    }
	}

  useEffect(() => {
    fetchFoodData();
  }, []);

	return (
		<FoodContext.Provider value={{foodData, isLoading, addFoodData}}>
			{children}
		</FoodContext.Provider>
	)
}
