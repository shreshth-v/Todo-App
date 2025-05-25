// src/components/TaskCard.jsx
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (newStatus) => {
    if (task.status !== newStatus) {
      dispatch(
        updateTask({ id: task._id, data: { ...task, status: newStatus } })
      );
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 
                    bg-gray-50 dark:bg-gray-900 
                    p-5 rounded-xl 
                    border border-gray-300 dark:border-gray-700 
                    shadow-md hover:shadow-lg 
                    transition duration-300 ease-in-out"
    >
      {/* Task Content */}
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {task.title}
          </h2>
          <span
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize self-start sm:self-auto ${
              task.status === "pending"
                ? "bg-yellow-500 text-yellow-900"
                : task.status === "in progress"
                ? "bg-blue-500 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {task.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span className="font-medium">Due Date:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString("en-GB")}
        </p>

        <div className="mt-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Change Status:
          </label>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-white px-2 py-1 rounded-md text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 self-end sm:self-start">
        <Link
          to={`/edit/${task._id}`}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          title="Edit Task"
        >
          <FaEdit className="w-5 h-5 cursor-pointer" />
        </Link>
        <button
          onClick={() => dispatch(deleteTask(task._id))}
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          title="Delete Task"
        >
          <FaTrash className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
