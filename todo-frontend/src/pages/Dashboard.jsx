import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  updateTask,
} from "../features/tasks/taskSlice";
import Loader from "../components/Loader";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const handleStatusChange = (task, newStatus) => {
    if (task.status !== newStatus) {
      dispatch(
        updateTask({ id: task._id, data: { ...task, status: newStatus } })
      );
    }
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const statusCounts = {
    pending: list.filter((task) => task.status === "pending").length,
    "in progress": list.filter((task) => task.status === "in progress").length,
    completed: list.filter((task) => task.status === "completed").length,
  };

  const filteredTasks =
    filterStatus === "all"
      ? list
      : list.filter((task) => task.status === filterStatus);

  if (loading) return <Loader />;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
        Your Tasks
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "All Tasks", value: "all", count: list.length },
          { label: "Pending", value: "pending", count: statusCounts.pending },
          {
            label: "In Progress",
            value: "in progress",
            count: statusCounts["in progress"],
          },
          {
            label: "Completed",
            value: "completed",
            count: statusCounts.completed,
          },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilterStatus(item.value)}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border transition ${
              filterStatus === item.value
                ? item.value === "pending"
                  ? "bg-yellow-500 text-yellow-900"
                  : item.value === "in progress"
                  ? "bg-blue-500 text-white"
                  : item.value === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
                : item.value === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : item.value === "in progress"
                ? "bg-blue-100 text-blue-800"
                : item.value === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-lg text-center">
          No tasks found.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
