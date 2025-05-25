import Task from "../models/task.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

export const createTask = asyncWrapper(async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
    user: req.user._id,
  });

  res.status(201).json(task);
});

export const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) throw new CustomError(404, "Task not found");

  if (task.user.toString() !== req.user._id.toString()) {
    throw new CustomError(403, "Not authorized to update this task");
  }

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updated);
});

export const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) throw new CustomError(404, "Task not found");

  if (task.user.toString() !== req.user._id.toString()) {
    throw new CustomError(403, "Not authorized to delete this task");
  }

  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Task deleted successfully" });
});
