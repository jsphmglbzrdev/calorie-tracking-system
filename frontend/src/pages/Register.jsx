import { useState, useEffect } from "react";
import API from "../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FourSquare } from "react-loading-indicators";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await API.post("/auth/register", form);
      navigate("/login");
      setForm({
        name: "",
        email: "",
        password: "",
        age: "",
        height: "",
        weight: "",
      }); // clear inputs
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('/img/food-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-green-300 opacity-30 z-0" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <FourSquare color="#32cd32" size="medium" />
        </div>
      )}

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl space-y-6 z-10"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Create your <span className="text-green-600">KiloWise</span> account
          </h2>
          <p className="text-gray-600">
            Track and make a fitness journey by tracking your calorie intake!
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              type={
                key === "password"
                  ? "password"
                  : key === "age" || key === "height" || key === "weight"
                  ? "number"
                  : key === "email"
                  ? "email"
                  : "text"
              }
              min={0}
              placeholder={key[0].toUpperCase() + key.slice(1)}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Actions */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 cursor-pointer"
          >
            Register
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="text-green-500 underline hover:text-green-900 transition-all duration-100"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
