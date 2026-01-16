import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
	const [calories, setCalories] = useState(0);
  // Load token on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
		fetchUser(storedToken);
  }, []);

  const fetchUser = async (token) => {
		try{
			const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    	});

			setUser(res.data.user.name);
			setCalories(res.data.user.dailyCalories);
		}catch(err){
			logout()
		}
   
  };

  const login = async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user.name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, calories, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
