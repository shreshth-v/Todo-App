import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask } from "../features/tasks/taskSlice";

const AddEditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const existing = tasks.find((task) => task._id === id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existing) {
      const formattedDate = existing.dueDate?.split("T")[0] || "";
      setForm({ ...existing, dueDate: formattedDate });
    }
  }, [existing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (form.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (!form.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      dispatch(updateTask({ id, data: form }));
    } else {
      dispatch(createTask(form));
    }
    navigate("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-300 dark:border-none">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        {id ? "Edit Task" : "Add Task"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Title"
            className={`w-full p-3 rounded-lg border ${
              errors.title
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Task Description"
            rows={4}
            className={`w-full p-3 rounded-lg border ${
              errors.description
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.description && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.description}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              errors.dueDate
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.dueDate && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.dueDate}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              errors.status
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.status}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
        >
          {id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddEditTask;
