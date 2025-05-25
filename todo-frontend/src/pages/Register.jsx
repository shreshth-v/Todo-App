import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await dispatch(register(form));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-1">
            <div className="relative h-12">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full h-full pl-10 pr-4 rounded-lg border ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <div className="relative h-12">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full h-full pl-10 pr-4 rounded-lg border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative h-12">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full h-full pl-10 pr-4 rounded-lg border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
