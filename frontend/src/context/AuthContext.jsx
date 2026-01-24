import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [calories, setCalories] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user.name);
      setCalories(res.data.user.dailyCalories);
    } catch (err) {
      logout();
    } finally {
      setAuthLoading(false);
    }
  };

  // Run once on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setAuthLoading(false);
      return;
    }

    setToken(storedToken);
    fetchUser(storedToken);
  }, []);

  const login = async (formData) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    const token = res.data.token;

    localStorage.setItem("token", token);
    setToken(token);

    // 🔥 fetch full user data immediately
    await fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCalories(0);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        calories,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};