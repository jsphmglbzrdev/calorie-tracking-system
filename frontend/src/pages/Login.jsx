import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ ...form }); // submit snapshot
      setForm({ email: "", password: "" }); // clear inputs
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide error after 5 seconds
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
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-green-300 opacity-30 z-0" />

      {/* Loading Overlay */}
      {loading && (
				<LoadingSpinner/>
      )}

      {/* Login Form */}
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4 relative z-10"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Welcome to <span className="text-green-600">KiloWise</span>
          </h2>
          <p className="text-gray-500">your ultimate calorie tracker.</p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full text-white p-2 rounded-md transition-all
          ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }
        `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-gray-500">or</div>

          <div>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 underline hover:text-green-900"
            >
              Sign up now!
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
