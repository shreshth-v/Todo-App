import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";

// Fetch Tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("tasks");
      return res.data;
    } catch (err) {
      //   toast.error(err.response?.data?.message || "Failed to fetch tasks");
      return rejectWithValue(err.response.data);
    }
  }
);

// Create Task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("tasks", taskData);
      toast.success("Task created successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
      return rejectWithValue(err.response.data);
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`tasks/${id}`, data);
      toast.success("Task updated successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`tasks/${id}`);
      toast.success("Task deleted successfully");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task");
      return rejectWithValue(err.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
